import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EvtCard.scss";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config";

const EvtCard = ({ item }) => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
  const [par, setPar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await axios.post(
          `${config.apiBaseUrl}/api/auth/test-token/${accessToken}`
        );
        setUser(resUser.data);
        const resPar = await axios.get(
          `${config.apiBaseUrl}/api/participants/check_if_participated/${resUser.data._id}/${item._id}`
        );
        setPar(resPar.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Link to={`/event/${item._id}`} className="link">
      <div className="evtCard">
        <img src={`/${item.image_url}`} alt="" />
        <span className="title">{item.evt_name}</span>
        <span className="date">{item.date}</span>
        <span className="date">{item.sub_title}</span>
        {item.status == "accepted" &&
          user.role_name != "Admin" &&
          user.role_name != "Eventer" && (
            <>
              {par ? (
                <span>Participated</span>
              ) : (
                <Link to={`/participate/${item._id}`} className="link">
                  <button>Participate</button>
                </Link>
              )}
            </>
          )}
        {item.status == "pending" &&
          user.role_name != "Admin" &&
          user.role_name != "Eventer" && <span>Coming Soon</span>}
        {user.role_name == "Admin" && (
          <>
            {item.status == "pending" && (
              <span>
                <Link to={`/event/${item._id}`} className="link">
                  <button>Accept</button>
                </Link>
                <Link to={`/event/${item._id}`} className="link">
                  <button>Reject</button>
                </Link>
              </span>
            )}
          </>
        )}
        {user.role_name == "Eventer" && (
          <>{item.status == "pending" && <span>Pending</span>}</>
        )}
      </div>
    </Link>
  );
};

export default EvtCard;
