import { React, useEffect, useState } from "react";
import profilePicture from "../../../../assets/profilePicture.png";
import "./profile.css";

function Profile({ userId }) {
  const [userInfo, setUserInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1/Linkedin-clone/Backend/getUsers.php?userId=${userId}`
        );
        const userData = await response.json();
        if (userData.status === "success") {
          setUserInfo(userData.user_info[0]);
        } else {
          console.error("Error fetching user info:", userData.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile"></img>
      </div>

      <div className="profile-information">
        <p>
          <b>Name: </b>
          {`${userInfo && userInfo.name}`}
        </p>
        <p>
          <b>Email: </b>
          {`${userInfo && userInfo.email}`}
        </p>
        <p>
          <b>Skills: </b>
          {`${userInfo && userInfo.skills}`}
        </p>

        <p>
          <b>Experience: </b>
          {`${userInfo && userInfo.experience}`}
        </p>

        <p>
          <b>Education: </b>
          {`${userInfo && userInfo.education}`}
        </p>

        <p>
          <b>Bio: </b>
          {`${userInfo && userInfo.bio}`}
        </p>
        <button className="edit-button" onClick={togglePopup}>
          Edit
        </button>
      </div>

      {/* Popup and backdrop */}
      {showPopup && (
        <>
          <div className="popup-backdrop" onClick={closePopup}></div>
          <div className="edit-popup">
            <h2>Edit Profile</h2>
            <div className="edit-popup-info">
              <label>Name: </label>
              <input type="text" placeholder="Name"></input>
            </div>

            <div className="edit-popup-info">
              <label>Email: </label>
              <input type="text" placeholder="Email"></input>
            </div>

            <div className="edit-popup-info">
              <label>Skills: </label>
              <input type="text" placeholder="Skills"></input>
            </div>

            <div className="edit-popup-info">
              <label>Experience: </label>
              <input type="text" placeholder="Experience"></input>
            </div>

            <div className="edit-popup-info">
              <label>Education: </label>
              <input type="text" placeholder="Education"></input>
            </div>

            <div className="edit-popup-info">
              <label>Bio: </label>
              <input type="text" placeholder="Bio"></input>
            </div>

            <div className="popup-buttons">
              <button className="edit-button" onClick={closePopup}>
                Close
              </button>

              <button className="edit-button" onClick={closePopup}>
                Confirm
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
