import { React, useEffect, useState } from "react";
import profilePicture from "../../../../assets/profilePicture.png";
import "./profile.css";

function Profile({ userId }) {
  const [userInfo, setUserInfo] = useState(null);
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

  return (
    <div className="profile-wrapper">
      <div className="profile-picture">
        <img src={profilePicture}></img>
      </div>

      <div className="profile-information">
        <p>{`${userInfo && userInfo.name}`}</p>
        <p>
          <b>Name:</b> John Doe
        </p>
        <p>
          <b>Email:</b> JohnDoe@gmail.com
        </p>
        <p>
          <b>Skills:</b> Interviewing - Carrer Counseling - Hiring - Human
          Resources.
        </p>
        <p>
          <b>Bio:</b> Hello! I'm John Doe, a seasoned professional in the field
          of Human Resources. With a passion for fostering talent and enhancing
          organizational culture, I specialize in Interviewing, Career
          Counseling, Hiring, and various aspects of Human Resources management.
        </p>
      </div>
    </div>
  );
}

export default Profile;
