import React from "react";
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
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
      <p className="error-message">{incorrect}</p>
    </div>
  );
};

export default Home;
