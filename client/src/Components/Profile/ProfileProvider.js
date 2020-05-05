import React, { useContext, useState } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { getProfile, setProfile } from "../../usecases/user-api.usecase";
//import { colors } from "@material-ui/core";

//const [apiMessage, setApiMessage] = useState({});

// Setup Context and Initialize
export const ProfileContext = React.createContext({
  exists: false,
  nickName: "",
  email: "",
  onBoarded: Date.now,
  errorState: {},
});

// Create Provider
export const ProfileProvider = (props) => {
  const profileContext = useContext(ProfileContext);
  const [exists, setExists] = useState(profileContext.exists);
  const [nickName, setNickName] = useState(profileContext.nickName);
  const [email, setEmail] = useState(profileContext.email);
  const [onBoarded, setOnboarded] = useState(profileContext.onBoarded);
  const [errorState, setErrorState] = useState(profileContext.errorState);

  const [allowOnce, setAllowOnce] = useState(true);
  
  const { getTokenSilently } = useAuth0();

  const updateContext= (profile) => {
    setEmail(profile.success ? profile.res.email : "");
    setNickName(profile.success ? profile.res.nickName : "");
    setOnboarded(profile.success ? profile.res.onBoarded : Date.now);
    setExists(profile.success ? profile.res.exists : false);
    setErrorState(profile.error ? profile.error : {});
  }

  const readProfile = async () => {
    setAllowOnce(false);
    const token = await getTokenSilently();
    const reply = await getProfile(token);
    updateContext(reply);
  };

  const writeProfile = async (profile) => {
      setAllowOnce(false);
      const token = await getTokenSilently();
      const reply = await setProfile(token, profile);
      updateContext(reply);
    };

  if (allowOnce) {
    readProfile();
  }

  const provider = {
    exists,
    nickName,
    email,
    onBoarded,
    errorState,
    setFetchProfile: () => {
      setAllowOnce(true);
      readProfile();
    },
    setUpdateProfile: (email, nickName) => {
        setAllowOnce(true);
        writeProfile({email: email, nickName: nickName});
    },
  };

  return (
    <ProfileContext.Provider value={provider}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
