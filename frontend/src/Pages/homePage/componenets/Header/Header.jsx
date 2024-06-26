import { React } from "react";
import { FaLinkedin, FaHome, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="header-wrapper">
        <div className="header-border">
          <div className="header">
            <div className="logo-left">
              <h2 className="logo">
                <FaLinkedin
                  onClick={() => {
                    navigateTo("/home");
                  }}
                />
              </h2>
            </div>

            <div className="logo-right">
              <h2>
                <FaHome
                  onClick={() => {
                    navigateTo("/home");
                  }}
                />
              </h2>
              <h2>
                <FaBell />
              </h2>
              <h2
                onClick={() => {
                  navigateTo("/profile");
                }}
              >
                <CgProfile />
              </h2>
              <h2>
                <IoLogOut
                  onClick={() => {
                    navigateTo("/");
                  }}
                />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
