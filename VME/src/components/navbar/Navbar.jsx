import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../config";

const Navbar = () => {
  const accessToken = Cookies.get("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState({});
  const [hide, setHide] = useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setIsLoggedIn(false);
  };

  const handleMenu = () => {
    setHide(true);
  };

  const handleHide = () => {
    setHide(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${config.apiBaseUrl}/api/auth/test-token/${accessToken}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">VME</span>
          </Link>
        </div>
        <div className="nav">
          <ul>
            <li>
              <Link to="/events" className="link">
                Events
              </Link>
            </li>
            <li>
              <Link to="/categories" className="link">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="link">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="user">
            <span>{user.name}</span>
            <div onClick={toggleDropdown}>
              <img src={user.image_url} alt="" />
            </div>
            {dropdownVisible && (
              <div className="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="button">
            <Link to="/login" className="link">
              <button>Login</button>
            </Link>
            <Link to="/register" className="link">
              <button>Register</button>
            </Link>
          </div>
        )}
        <div className="menu">
          <FontAwesomeIcon onClick={handleMenu} icon={faBars} size="2x" />
          {hide && (
            <div className="menu-content">
              <FontAwesomeIcon
                onClick={handleHide}
                icon={faCircleXmark}
                size="2x"
                style={{
                  "--fa-primary-color": "#ffffff",
                  "--fa-secondary-color": "#000000",
                }}
              />
              <div className="nav">
                <ul>
                  <li>
                    <Link to="/events" className="link">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="link">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/aboutus" className="link">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              {isLoggedIn ? (
                <div className="user">
                  <Link to="/profile" className="link links">
                    Profile
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div className="button">
                  <Link to="/login" className="link">
                    <button>Login</button>
                  </Link>
                  <Link to="/register" className="link links">
                    <button>Register</button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
