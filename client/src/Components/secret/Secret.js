import React, { useContext } from "react";
import ExternalApi from "../external-api/External-API";
import NavBar from "../navbar/NavBar";
import { ProfileContext } from "../Profile/ProfileProvider";

var Secret = (props) => {
  const profileContext = useContext(ProfileContext);

  const saveData = () => {
    profileContext.setUpdateProfile("j@bbbb.com", "Sup my friend");
  };

  return (
    <div>
      <NavBar />
      <p>This is REALLY SECRET stuff. {props.location}</p>
      <div>
        <p>Interesting Stuff:{profileContext.nickName}</p>
        <p>Interesting Date:{profileContext.onBoarded}</p>
        <ExternalApi />
      </div>
      <button onClick={profileContext.setFetchProfile}>UGH</button>
      <button onClick={saveData}>Save It</button>
    </div>
  );
};

export default Secret;
