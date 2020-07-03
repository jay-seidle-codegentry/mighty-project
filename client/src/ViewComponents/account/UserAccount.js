import React, { useContext, useState, useRef, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { ProfileContext } from "../../Components/Profile/ProfileProvider";
import { setPreferences } from "../../usecases/profile-api.usecase";

export const UserAccount = (props) => {
  const initializing = useRef(true);
  const pp = useContext(ProfileContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [name, setName] = useState("");
  const [bubba, setBubba] = useState("");
  const [dt, setDt] = useState("");

  const prefsHandler = (newPrefs) => {
    const { test, bubba, date } = newPrefs;
    if (test) setName(test);
    if (bubba) setBubba(bubba);
    if (date) setDt(date);
  };

  const testIt = () => {
    const params = {
      body: {
        properties: { bubba: "batchyball", phone: "8675309", date: Date.now() },
      },
    };
    pp.withPreferences(setPreferences, params);
  };

  useEffect(() => {
    if (initializing.current) {
      initializing.current = false;
      pp.addPreferencesHandler(prefsHandler);
    }

    return () => {
      pp.removePreferenceHandler(prefsHandler);
    };
  }, [pp]);

  return (
    <>
      <h1>This is the Account view</h1>
      {isAuthenticated && <p>User: {user.sub}</p>}
      <p>
        Name: {}
        {name}
      </p>
      <p>
        Bubba: {}
        {bubba}
      </p>
      <p>
        Date: {}
        {dt}
      </p>
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
        <button onClick={testIt}>WHOA!</button>
      </p>
    </>
  );
};

export default UserAccount;
