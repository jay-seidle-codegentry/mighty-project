import React, { useContext } from "react";
import { ProfileContext } from "../Components/Profile/ProfileProvider";

export const ProfileConsumerMock = (props) => {
  const profileContext = useContext(ProfileContext);

  const saveData = () => {
    profileContext.setUpdateProfile("j@bbbb.com", "Sup my friend");
  };

  return (
    <div>
      <div>
        <p>Interesting Stuff:{profileContext.nickName}</p>
        <p>Interesting Date:{profileContext.onBoarded}</p>
      </div>
      <button onClick={profileContext.setFetchProfile}>UGH</button>
      <button onClick={saveData}>Save It</button>
    </div>
  );
};

export default ProfileConsumerMock;
