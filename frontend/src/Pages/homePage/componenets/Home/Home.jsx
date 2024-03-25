import React from "react";
import { CgProfile } from "react-icons/cg";
import rafikImage from "../../../../assets/rafik.png";
import "./Home.css";

const Home = ({
  handleImageChange,
  image,
  setImage,
  text,
  setText,
  handleUpload,
  incorrect,
}) => {
  return (
    <div className="homepage-wrapper">
      <div className="user-profile">
        <h2>
          <CgProfile />
        </h2>
        <p>User Name</p>
      </div>
      <div className="middle-wrapper">
        <div className="search-post-wrapper">
          <div className="input-container">
            <input
              type="text"
              className="text-input"
              placeholder="Start a post"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="choose-image-container">
              <label htmlFor="fileInput" className="choose-image-btn">
                Choose Image
              </label>
              <input
                type="file"
                id="fileInput"
                className="image-post"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
          {image && (
            <div className="image-container">
              <img src={image} alt="Uploaded" className="uploaded-image" />
            </div>
          )}
          <p className="error-message">{incorrect}</p>
        </div>
        <div className="posted-images-container">
          <img src={rafikImage} alt="Failed Load" />
        </div>
      </div>

      <div className="follower-card">
        <p>User Name</p>
        <button>+ Follow</button>

        <p>User Name</p>
        <button>+ Follow</button>

        <p>User Name</p>
        <button>+ Follow</button>
      </div>
    </div>
  );
};

export default Home;
