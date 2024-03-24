import { React, useState } from "react";
import Header from "./componenets/Header/Header";
import Home from "./componenets/Home/Home";

const HomePage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <div>
      <Header></Header>
      <Home
        handleImageChange={handleImageChange}
        image={image}
        setImage={setImage}
      ></Home>
    </div>
  );
};

export default HomePage;
