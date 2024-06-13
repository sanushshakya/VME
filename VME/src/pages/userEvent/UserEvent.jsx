import React, { useEffect, useState } from "react";
import "./UserEvent.scss";
import EvtCard from "../../components/evtCard/EvtCard";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config";

const UserEvent = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
  const [evts, setEvt] = useState([]);
  const [events, setEvent] = useState([]);

  useEffect(() => {
    const getEvts = async () => {
      try {
        const resUser = await axios.post(
          `${config.apiBaseUrl}/api/auth/test-token/${accessToken}`
        );
        setUser(resUser.data);
        const resPar = await axios.get(
          `${config.apiBaseUrl}/api/participants/read_event_participated_by_user/${resUser.data._id}`
        );
        setEvt(resPar.data);
        const resEvt = await axios.get(
          `${config.apiBaseUrl}/api/events/read_by_user/${resUser.data._id}`
        );
        setEvent(resEvt.data);
      } catch (error) {
        return error;
      }
    };
    getEvts();
  }, []);
  if (!user || user.role_name == "Admin") {
    return (window.location.href = `/login`);
  }
  return (
    <div className="usrEvt">
      <div className="container">
        <div className="top">
          <h3>My Events</h3>
        </div>
        <div className="bottom">
          <div className="cards">
            {user.role_name == "User" && (
              <>
                {evts.map((evt) => (
                  <EvtCard key={evt._id} item={evt} />
                ))}
              </>
            )}
            {user.role_name == "Eventer" && (
              <>
                {events.map((event) => (
                  <EvtCard key={event._id} item={event} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEvent;
