import React, { useState } from "react";
import SignUp from "./componenets/signup/signup";
import "./styles.css";
import SignIn from "./componenets/signin/signin";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ userId, setUserId }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

  const navigateTo = useNavigate();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedType = checked ? value : "";
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      type: updatedType,
    }));
  };

  // ------------ signup errors display --------------
  const handleSignUp = async () => {
    if (
      credentials.password !== credentials.confirmPassword ||
      credentials.password.length < 6
    ) {
      setError("Passwords do not match or are too short.");
      return;
    } else if (!regex.test(credentials.email)) {
      setError("Invalid email address.");
      return;
    } else if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !credentials.type
    ) {
      setError("Inputs can't be empty.");
      return;
    }

    // ------------------- linking PHP --------------------
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("confirmPassword", credentials.confirmPassword);
    formData.append("type", credentials.type);

    try {
      const response = await fetch(
        "http://127.0.0.1/Linkedin-clone/Backend/signup.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Server response:", responseData);
      if (responseData.status === "success") {
        setIsLogin(true);
        setError("");
      } else {
        if (responseData.message === "email already exists.") {
          setError("Email already exists. Please use a different email.");
        } else {
          setError("Failed to sign up. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  const handleSignIn = async () => {
    if (!credentials.email || !credentials.password) {
      setError("Email and Password are required.");
      return;
    }

    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);

    try {
      const response = await fetch(
        "http://127.0.0.1/Linkedin-clone/Backend/signin.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Server response:", responseData);
      if (responseData.status === "success") {
        setUserId(responseData.id);
        navigateTo("/home");
        setError("");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <body>
      <div className="wrapper">
        <div>
          <h1>LinkedIn</h1>
        </div>
        {isLogin ? (
          <SignIn
            credentials={credentials}
            setCredentials={setCredentials}
            error={error}
            handleSignIn={handleSignIn}
            setIsLogin={setIsLogin}
          ></SignIn>
        ) : (
          <SignUp
            handleSignUp={handleSignUp}
            credentials={credentials}
            setCredentials={setCredentials}
            error={error}
            setIsLogin={setIsLogin}
            handleCheckboxChange={handleCheckboxChange}
          ></SignUp>
        )}
      </div>
    </body>
  );
};

export default LoginPage;
