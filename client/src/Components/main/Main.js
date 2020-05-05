import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

var Main = (props) => {
  //const dotenv = require('dotenv');
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <div>
      <p>{process.env.REACT_APP_EAT_PIZZA}</p>
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
    </div>
  );
};

export default Main;
