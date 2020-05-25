import React, { useContext } from "react";
import Loading from "../../Components/loading/Loading";
import ErrorView from "../error/ErrorView";
//import { useAuth0 } from "../../react-auth0-spa";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import { Trial } from "./Trial";

export const Home = (props) => {
  //const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const profileContext = useContext(ProfileContext);

  if (profileContext.loading) return <Loading />;

  if (profileContext.errorState.error) {
    return <ErrorView message={profileContext.errorState.error} />;
  }

  return (
    <>
      <Trial />
      {/* <h1>This is the Home view</h1>
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
      </p> */}
    </>
  );
};

export default Home;
