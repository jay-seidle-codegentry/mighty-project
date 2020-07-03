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

  const pubishedData = useRef(new Map());
  const subscribedHandlers = useRef(new Map());

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

  const secureParams = async (params) => {
    const token = await getTokenSilently();
    return { token: token, ...params };
  };

  const confirmSubjectSetup = (subject) => {
    if (!subject) throw new Error("invalid subject");

    if (!subscribedHandlers.current.has(subject)) {
      subscribedHandlers.current.set(subject, []);
    }

    if (!pubishedData.current.has(subject)) {
      pubishedData.current.set(subject, {});
    }
  };

  const triggerHandler = (handler, data) => {
    try {
      handler(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const subscribe = async (subject, handler) => {
    confirmSubjectSetup(subject);

    subscribedHandlers.current.get(subject).push(handler);

    if (Object.entries(pubishedData.current.get(subject)).length === 0) {
      // initialize if has initializer
      if (initializers[subject]) {
        const { method, usecase, params } = initializers[subject];
        if (method && usecase && params) {
          await method(usecase, params);
        }
      }
    } else {
      triggerHandler(handler, pubishedData.current.get(subject));
    }
  };

  const unsubscribe = async (subject, handler) => {
    if (subscribedHandlers.current.has(subject)) {
      subscribedHandlers.current.set(subject, subscribedHandlers.current.get(subject).filter((h) => {
        return h !== handler;
      }));
    }
  };

  const publish = async (subject, data) => {
    confirmSubjectSetup(subject);
    pubishedData.current.set(subject, {
      ...pubishedData.current.get(subject),
      ...data,
    });
    subscribedHandlers.current.get(subject).forEach((handler) => {
      triggerHandler(handler, data);
    });
  };

  const createProfileContext = async (profileUsecase, params) => {
    setLoading(true);
    let profile = {};
    try {
      profile = await profileUsecase(await secureParams(params));
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

  const withPreferences = async (usecase, params) => {
    const results = await usecase(await secureParams(params));
    publish("preferences", results);
  };

  if (initializing) {
    createProfileContext(getProfile, {});
    setInitializing(false);
  }
  const initializers = {
    preferences: {
      method: withPreferences,
      usecase: getPreferences,
      params: {},
    },
    profile: { method: createProfileContext, usecase: getProfile, params: {} },
  };

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
    subscribe: subscribe,
    unsubscribe: unsubscribe,
  };

  return (
    <ProfileContext.Provider value={provider}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
