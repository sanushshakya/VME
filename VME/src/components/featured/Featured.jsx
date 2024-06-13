import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Featured.scss";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Featured = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
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
    fetchData();
  }, []);
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <img src="./img/featured1.png" />
          {user.role_name == "Eventer" && (
            <Link to="/createevent" className="link">
              <button>
                <FontAwesomeIcon icon={faCalendarDays} />
                <h3>Schedule Event</h3>
              </button>
            </Link>
          )}
        </div>
        <div className="right">
          <div className="heading">
            <h1>
              Manage your work
              <br />
              effectively with us.
            </h1>
            <h3>
              Handling your stress
              <br /> so
              <br />
              your event is a sucess.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
