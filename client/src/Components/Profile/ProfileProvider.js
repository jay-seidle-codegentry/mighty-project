import React, { useState, useContext } from "react";
import { getProfile, getPreferences } from "../../usecases/profile-api.usecase";
import { useAuth0 } from "../../react-auth0-spa";
import Loading from "../loading/Loading";
import { GlobalContext } from "../Global/GlobalProvider";

// Setup Context and Initialize
export const ProfileContext = React.createContext();

// Create Provider
export const ProfileProvider = (props) => {
  const globalContext = useContext(GlobalContext);
  const { getTokenSilently, user } = useAuth0();

  const [loading, setLoading] = useState(true);

  const secureParams = async (params) => {
    const token = await getTokenSilently();
    return { token: token, ...params };
  };

  const withPreferences = async (usecase, params) => {
    const results = await usecase(await secureParams(params));
    globalContext.publish("preferences", results);
  };

  const withProfile = async (usecase, params) => {
    setLoading(true);
    const results = await usecase(
      await secureParams({ avatar: user.picture, ...params })
    );
    globalContext.publish("profile", results);
    setLoading(false);
  };

  const updateEnvelopes = async (envelopes) => {
    globalContext.publish("profile", { envelopes: envelopes });
  };

  globalContext.addInitializer(
    "preferences",
    withPreferences,
    getPreferences,
    {}
  );

  globalContext.addInitializer("profile", withProfile, getProfile, {});

  const provider = {
    withPreferences: withPreferences,
    withProfile: withProfile,
    updateEnvelopes: updateEnvelopes,
  };

  return (
    <ProfileContext.Provider value={provider}>
      {loading && <Loading />}
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
