import React, { useEffect, useState } from "react";
import "./Events.scss";
import { Link } from "react-router-dom";
import EvtCard from "../../components/evtCard/EvtCard";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config";

const Events = () => {
  const [evts, setEvts] = useState([]);
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
  useEffect(() => {
    const getEvts = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/api/events/read`
        );
        setEvts(response.data);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    getEvts();

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
    <div className="events">
      <div className="container">
        <div className="top">
          <div className="left">
            <h1>Events</h1>
            <h3>Find the best event you'd like to join.</h3>
          </div>
          {user.role_name == "Eventer" && (
            <div className="right">
              <Link to="/createevent" className="link">
                <button>Create New Event</button>
              </Link>
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="cards">
            {evts.map((evt) => (
              <EvtCard key={evt._id} item={evt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
