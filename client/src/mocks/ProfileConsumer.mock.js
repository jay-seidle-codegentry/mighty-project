import React, { useContext } from "react";
import { ProfileContext } from "../Components/Profile/ProfileProvider";

var ProfileConsumerMock = (props) => {
  const profileContext = useContext(ProfileContext);

  const saveData = () => {
    profileContext.setUpdateProfile("j@bbbb.com", "Sup my friend");
  };

  return (
    <div>
      <p>This is REALLY SECRET stuff. {props.location}</p>
      <div>
        <p data-testid="nn">{profileContext.nickName}</p>
        <p>{profileContext.onBoarded}</p>
      </div>
      <button onClick={profileContext.setFetchProfile}>UGH</button>
      <button onClick={saveData}>Save It</button>
    </div>
  );
};

export default ProfileConsumerMock;
