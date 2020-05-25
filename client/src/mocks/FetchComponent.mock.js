import React from "react";

import useFetchIt from "../utils/FetchIt";

export default function FetchComponent() {
  const { data, error, loading, refresh } = useFetchIt(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const update = () => {
    refresh();
  };

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    const { message } = error;
    return <div data-testid="error">Error: {message}</div>;
  }

  return (
    <div data-testid="this">
      <code>{data && data.message}</code>
      <button data-testid="updateButton" onClick={update}>
        ClickMe
      </button>
    </div>
  );
}
