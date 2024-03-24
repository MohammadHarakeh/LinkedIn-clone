import { React, useState } from "react";
import Header from "./componenets/Header/Header";
import Home from "./componenets/Home/Home";

const HomePage = ({ userId, setUserId }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);
  const [incorrect, setIncorrect] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        setIncorrect("");
      } else {
        setIncorrect("Wrong input file");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        setImage(result);
        const blob = new Blob([result], { type: file.type });
        setBlob(blob);
      };

      reader.readAsDataURL(file);
      console.log(blob);
      console.log(image);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", blob);
    formData.append("id", userId);
    formData.append("text", text);

    try {
      const response = await fetch(
        "http://127.0.0.1/Linkedin-clone/Backend/post.php",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("text: ", text);
      console.log("User ID: ", userId);
      console.log("image: ", blob);

      const responseData = await response.json();
      console.log("Server response:", responseData);
      if (responseData.status === "success") {
        setImage(null);
        setText("");
      } else if (responseData.message === "error") {
        console.log("Error uploading image and text:", responseData.error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
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
        handleUpload={handleUpload}
        incorrect={incorrect}
        setIncorrect={setIncorrect}
      ></Home>
    </div>
  );
};

export default HomePage;
