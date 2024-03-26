import { React, useEffect, useState } from "react";
import profilePicture from "../../../../assets/profilePicture.png";
import "./profile.css";

function Profile({ userId }) {
  const [userInfo, setUserInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");

  const [editedInfo, setEditedInfo] = useState({
    skills: "",
    experience: "",
    education: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1/Linkedin-clone/Backend/getUsers.php?userId=${userId}`
        );
        const userData = await response.json();
        if (userData.status === "success") {
          setUserInfo(userData.user_info[0]);
          setEditedInfo(userData.user_info[0]);
          setSkills(userData.skills);
          setExperience(userData.experience);
          setEducation(userData.education);
          setBio(userData.bio);
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

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("skills", skills);
    formData.append("experience", experience);
    formData.append("education", education);
    formData.append("bio", bio);
    try {
      const response = await fetch(
        `http://127.0.0.1/Linkedin-clone/Backend/updateUser.php?userId=${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setUserInfo(editedInfo);
        closePopup();
      } else {
        console.error("Error updating user info:", data.message);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
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

      {showPopup && (
        <>
          <div className="popup-backdrop" onClick={closePopup}></div>
          <div className="edit-popup">
            <h2>Edit Profile</h2>

            <div className="edit-popup-info">
              <label>Skills: </label>
              <input
                type="text"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              ></input>
            </div>

            <div className="edit-popup-info">
              <label>Experience: </label>
              <input
                type="text"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              ></input>
            </div>

            <div className="edit-popup-info">
              <label>Education: </label>
              <input
                type="text"
                placeholder="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              ></input>
            </div>

            <div className="edit-popup-info">
              <label>Bio: </label>
              <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></input>
            </div>

            <div className="popup-buttons">
              <button className="edit-button" onClick={closePopup}>
                Close
              </button>

              <button className="edit-button" onClick={handleConfirm}>
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
