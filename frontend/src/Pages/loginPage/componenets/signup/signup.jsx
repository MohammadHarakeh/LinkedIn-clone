import React from "react";
import "./signup.css";

export default function SignUp({
  handleSignUp,
  credentials,
  error,
  setCredentials,
  setIsLogin,
  handleCheckboxChange,
}) {
  return (
    <div className="signup-modal">
      <div className="inputs">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        ></input>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={credentials.name}
          onChange={(e) => {
            setCredentials({ ...credentials, name: e.target.value });
          }}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => {
            setCredentials({
              ...credentials,
              password: e.target.value,
            });
          }}
        ></input>
        <input
          type="password"
          name="confirmPasss"
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChange={(e) => {
            setCredentials({
              ...credentials,
              confirmPassword: e.target.value,
            });
          }}
        ></input>
        <div>
          <label>
            <input
              type="checkbox"
              name="type"
              value="Company"
              checked={credentials.type === "Company"}
              onChange={handleCheckboxChange}
            />
            Company
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="type"
              value="User"
              checked={credentials.type === "User"}
              onChange={handleCheckboxChange}
            />
            User
          </label>
        </div>
      </div>
      {error !== "" && <p className="error-message">{error}</p>}

      <div className="signup-btn">
        <button onClick={handleSignUp}>Sign up</button>
      </div>

      <div className="swicher">
        <p>
          Already have an account?{" "}
          <span
            className="sign-in-btn"
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
