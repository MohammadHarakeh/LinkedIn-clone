import React, { useState } from "react";
import "./signin.css";

const SignIn = ({ credentials, setCredentials, error, handleSignIn }) => {
  return (
    <div>
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
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        ></input>

        {error !== "" && <p className="error-message">{error}</p>}

        <div className="signup-btn">
          <button onClick={handleSignIn}>Sign in</button>
        </div>

        <div className="swicher">
          <p>
            Don't have an account? <span className="sign-in-btn">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
