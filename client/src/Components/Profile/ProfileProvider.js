import React, { useContext, useState, useRef } from "react";
import { getProfile, getPreferences } from "../../usecases/profile-api.usecase";
import { useAuth0 } from "../../react-auth0-spa";

const initialContext = {
  loading: true,
  exists: false,
  errorState: {},
  avatar: null,
  nickName: "",
  email: "",
  accounts: [],
  envelopes: [],
  onBoarded: Date.now,
};

// Setup Context and Initialize
export const ProfileContext = React.createContext(initialContext);

// Create Provider
export const ProfileProvider = (props) => {
  const { getTokenSilently, user } = useAuth0();
  // Setup Preferences Store
  const preferences = useRef();
  const preferenceHandlers = useRef([]);

  const profileContext = useContext(ProfileContext);
  const [initializing, setInitializing] = useState(true);

  // internal states
  const [loading, setLoading] = useState(profileContext.loading);
  const [exists, setExists] = useState(profileContext.exists);
  const [errorState, setErrorState] = useState(profileContext.errorState);

  // Auth0 profile state
  const [avatar, setAvatar] = useState(profileContext.avatar);

  // App DB profile state
  const [nickName, setNickName] = useState(profileContext.nickName);
  const [email, setEmail] = useState(profileContext.email);
  const [onBoarded, setOnboarded] = useState(profileContext.onBoarded);
  const [accounts, setAccounts] = useState(profileContext.accounts);
  const [envelopes, setEnvelopes] = useState(profileContext.envelopes);

  const createProfileContext = async (profileUsecase, params) => {
    setLoading(true);
    let profile = {};
    try {
      const token = await getTokenSilently();

      profile = await profileUsecase({ token: token, ...params });
      setExists(profile.exists ? profile.exists : initialContext.exists);
      setErrorState(profile.error ? profile.error : initialContext.errorState);
      setAvatar(profile.avatar ? profile.avatar : user.picture);
      setNickName(
        profile.nickName ? profile.nickName : initialContext.nickName
      );
      setEmail(profile.email ? profile.email : initialContext.email);
      setAccounts(profile.accounts ? profile.accounts : []);
      setEnvelopes(profile.envelopes ? profile.envelopes : []);
      setOnboarded(
        profile.onBoarded ? profile.onBoarded : initialContext.onBoarded
      );
    } catch (e) {
      profile = { error: JSON.stringify(e.message, null, 2) };
      setErrorState(profile);
    }
    setLoading(false);
  };

  const triggerHandler = (handler, data) => {
    try {
      handler(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addPreferencesHandler = async (handler) => {
    preferenceHandlers.current.push(handler);
    if(!preferences.current) {
      await withPreferences(getPreferences, {});
    } else {
      triggerHandler(handler, preferences.current);
    }
  };

  const removePreferenceHandler = async (handler) => {
    preferenceHandlers.current = preferenceHandlers.current.filter((h) => { return h !== handler; });
  };

  const withPreferences = async (usecase, params) => {
    const token = await getTokenSilently();
    const results = await usecase({ token: token, ...params });
    preferences.current = { ...preferences.current, ...results };
    preferenceHandlers.current.forEach((handler) => {
      triggerHandler(handler, results);
    });
  };

  if (initializing) {
    createProfileContext(getProfile, {});
    setInitializing(false);
  }

  const provider = {
    loading,
    exists,
    errorState,
    avatar,
    nickName,
    email,
    onBoarded,
    accounts,
    envelopes,
    setProfile: async (profileUsecase, params) => {
      createProfileContext(profileUsecase, params);
    },
    withPreferences: withPreferences,
    addPreferencesHandler: addPreferencesHandler,
    removePreferenceHandler: removePreferenceHandler,
  };

  return (
    <ProfileContext.Provider value={provider} >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
