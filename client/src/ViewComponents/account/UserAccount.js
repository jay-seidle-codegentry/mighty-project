import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

export const UserAccount = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <>
        <h1>This is the Account view</h1>
      {isAuthenticated && <p>User: {user.sub}</p>}
      <p>
        <span>Please Login First:</span>
        {!isAuthenticated && (
          <button data-testid="login" onClick={() => loginWithRedirect({})}>
            Log in
          </button>
        )}

        {isAuthenticated && (
          <button data-testid="logout" onClick={() => logout()}>
            Log out
          </button>
        )}
      </p>
    </>
  );
};

export default UserAccount;
