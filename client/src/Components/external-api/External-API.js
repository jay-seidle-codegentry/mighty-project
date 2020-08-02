// src/views/ExternalApi.js

import React, { useState } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import {
  getTimestamp,
  getExternalApi,
} from "../../usecases/external-api-usecases";

export const ExternalApi = () => {
  const { user, getTokenSilently } = useAuth0();
  const [apiMessage, setApiMessage] = useState("");

  const externalApi = async () => {
    const token = await getTokenSilently();

    const reply = await getExternalApi(token);
    setApiMessage(reply);
  };

  const timestampApi = async () => {
    const reply = await getTimestamp();
    setApiMessage(reply);
  };

  let loading = false;
  let error = false;

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <h1>External API</h1>
      <button data-testid="btn-secure-api" onClick={externalApi}>
        Ext API
      </button>
      <button data-testid="btn-time" onClick={timestampApi}>
        Time API
      </button>
      <p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </p>
      <p>{data && <code>{JSON.stringify(data, null, 2)}</code>}</p>
      <p>
        {error && (
          <code>
            server responded with <code>{JSON.stringify(error, null, 2)}</code>
          </code>
        )}
      </p>
    </>
  );
};

export default ExternalApi;
