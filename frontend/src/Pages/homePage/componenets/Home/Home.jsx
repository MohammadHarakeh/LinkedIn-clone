import React from "react";
import "./Home.css";

const Home = ({ handleImageChange, image, setImage }) => {
  return (
    <div className="search-post-wrapper">
      <div className="input-container">
        <input type="text" className="text-input" placeholder="Start a post" />
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
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="uploaded-image"
        />
      )}
    </div>
  );
};

export default Home;
