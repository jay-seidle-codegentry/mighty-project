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
    //console.log("omg");
    const reply = await getTimestamp();
    //console.log('about to set state');
    //console.log(reply);
    setApiMessage(reply);
  };

  return (
    <>
      <h1>External API</h1>
      <button data-testid="btn-secure-api" onClick={externalApi}>Ext API</button>
      <button data-testid="btn-time" onClick={timestampApi}>Time API</button>
      <p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </p>
      <p>
        {apiMessage.success && (
          <code>{JSON.stringify(apiMessage.res.msg, null, 2)}</code>
        )}
      </p>
      <p>
        {apiMessage.error && (
          <code>
            server responded with{" "}
            <code>{JSON.stringify(apiMessage.error, null, 2)}</code>
          </code>
        )}
      </p>
    </>
  );
};

export default ExternalApi;
