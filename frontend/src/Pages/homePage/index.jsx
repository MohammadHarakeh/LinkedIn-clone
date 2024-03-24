import { React, useState } from "react";
import Header from "./componenets/Header/Header";
import Home from "./componenets/Home/Home";

const HomePage = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id");
  };
  return (
    <div>
      <Header></Header>
      <Home
        handleImageChange={handleImageChange}
        image={image}
        setImage={setImage}
        text={text}
        setText={setText}
      ></Home>
    </div>
  );
};

export default HomePage;
