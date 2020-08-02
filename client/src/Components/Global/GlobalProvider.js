import React, { useRef } from "react";
import { useAuth0 } from "../../react-auth0-spa";
//import Loading from "../loading/Loading";
//import ErrorView from "../error/ErrorView";

// Setup Context and Initialize
export const GlobalContext = React.createContext();

// Features
// x Messaging
// x Pub / Sub
// Login / Logout
// isAuthenticated, getToken, user, secureParams?
// Loading

// Create Provider
export const GlobalProvider = (props) => {
  const { logout } = useAuth0();

  //const [loading, setLoading] = useState(true);

  const pubishedData = useRef(new Map());
  const subscribedHandlers = useRef(new Map());

  // TODO: What about error messages

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
      if (initializers.has(subject)) {
        const { method, usecase, params } = initializers.get(subject);
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
      subscribedHandlers.current.set(
        subject,
        subscribedHandlers.current.get(subject).filter((h) => {
          return h !== handler;
        })
      );
    }
  };

  const publish = async (subject, data) => {
    for (const [key, value] of Object.entries(data)) {
      confirmSubjectSetup(key);
      pubishedData.current.set(key, value);
      subscribedHandlers.current.get(key).forEach((handler) => {
        triggerHandler(handler, value);
      });
    }
  };

  const logoutUser = () => {
    logout();
  };

  const initializers = new Map();

  const addInitializer = (
    subject,
    providerAPIMethod,
    usecase,
    params,
    initialValue
  ) => {
    initializers.set(subject, {
      method: providerAPIMethod,
      usecase: usecase,
      params: params,
      initialValue: initialValue,
    });
  };

  const provider = {
    addInitializer: addInitializer,
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    logoutUser: logoutUser,
  };

  return (
    <GlobalContext.Provider value={provider}>
      {/* {loading && <Loading />} */}
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
