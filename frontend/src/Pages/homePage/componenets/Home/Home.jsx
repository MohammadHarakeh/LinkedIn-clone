import React from "react";
import rafikImage from "../../../../assets/rafik.png";
import "./Home.css";

const Home = ({
  allUsers,
  handleImageChange,
  image,
  text,
  setText,
  handleUpload,
  incorrect,
  allPosts,
}) => {
  return (
    <div className="homepage-wrapper">
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
          {allPosts.map((post) => (
            <div key={post.postsId} className="post">
              <p>{post.name}</p>
              <p>{post.postText}</p>
              {post.postImage && (
                <img src={post.postImage} alt="Post" className="post-image" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
