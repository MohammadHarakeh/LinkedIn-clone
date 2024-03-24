import { React } from "react";
import "./Home.css";

const Home = ({ handleImageChange, image }) => {
  return (
    <div>
      <div className="search-post-wrapper">
        <input type="text" placeholder="Start a post"></input>
        <input type="file" onChange={handleImageChange}></input>
        <div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="uploaded-image"
            ></img>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
