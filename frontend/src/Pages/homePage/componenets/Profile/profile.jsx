import React from "react";
import profilePicture from "../../../../assets/profilePicture.png";
import "./profile.css";

function Profile({ userId, userInfo, allUserInfo }) {
  return (
    <div className="profile-wrapper">
      <div className="profile-picture">
        <img src={profilePicture}></img>
      </div>

      <div></div>
    </div>
  );
}

export default Profile;
