import { React, useState, useEffect } from "react";
import Home from "./componenets/Home/Home";
import Header from "./componenets/Header/Header";

const HomePage = ({ userId }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [incorrect, setIncorrect] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1/Linkedin-clone/Backend/getAllUsers.php"
        );
        const userData = await response.json();
        if (userData.status === "success") {
          setAllUsers(userData.user_info);
        } else {
          console.error("Error fetching all users:", userData.message);
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1/Linkedin-clone/Backend/getAllPosts.php"
        );
        const postsData = await response.json();
        if (postsData.status === "success") {
          setAllPosts(postsData.posts);
        } else {
          console.error("Error fetching all posts:", postsData.message);
        }
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

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
      };

      reader.readAsDataURL(file);
      console.log(image);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("postImage", image);
    formData.append("userId", userId);
    formData.append("postText", text);

    try {
      const response = await fetch(
        "http://127.0.0.1/Linkedin-clone/Backend/post.php",
        {
          method: "POST",
          body: formData,
        }
      );

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
        userId={userId}
        allUsers={allUsers}
        allPosts={allPosts}
      ></Home>
    </div>
  );
};

export default HomePage;
