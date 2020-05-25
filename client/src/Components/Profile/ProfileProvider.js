import React, { useContext, useState } from "react";
import { getProfile } from "../../usecases/user-api.usecase";
//import ProfileImage from "../../imges/searchpng.com-deafult-profile-icon-transparent-png-free-download.png";
//import ProfileImage from "../../imges/signup-login.png";
import { useAuth0 } from "../../react-auth0-spa";
// import {useFetchIt, fetchIt} from "../../utils/useFetchIt";
// import { getProfile, setProfile } from "../../usecases/user-api.usecase";

const initialContext = {
  loading: true,
  exists: false,
  errorState: {},
  avatar: null,
  nickName: "",
  email: "",
  onBoarded: Date.now,
};

// Setup Context and Initialize
export const ProfileContext = React.createContext(initialContext);

// Create Provider
export const ProfileProvider = (props) => {
  const { getTokenSilently, user } = useAuth0();
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

  const createProfileContext = async (retrieveProfile, params) => {
    setLoading(true);
    let profile = {};
    try {
      const token = await getTokenSilently();
      //console.log(params)
      profile = await retrieveProfile({ token: token, ...params });
      setExists(profile.exists ? profile.exists : initialContext.exists);
      setErrorState(profile.error ? profile.error : initialContext.errorState);
      setAvatar(profile.avatar ? profile.avatar : user.picture);
      setNickName(
        profile.nickName ? profile.nickName : initialContext.nickName
      );
      setEmail(profile.email ? profile.email : initialContext.email);
      setOnboarded(
        profile.onBoarded ? profile.onBoarded : initialContext.onBoarded
      );
    } catch (e) {
      profile = { error: JSON.stringify(e.message, null, 2) };
      setErrorState(profile);
    }
    setLoading(false);
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
    setProfile: async (retrievProfile, params) => {
      createProfileContext(retrievProfile, params);
    },
  };

  return (
    <ProfileContext.Provider value={provider}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
