import React, { useEffect, useState } from "react";
import "./Event.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import config from "../../config";

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
  const [par, setPar] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleAccept = async () => {
    const formData = new FormData();
    formData.append("status", "accepted");
    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/api/events/update/${eventId}`,
        formData
      );
      window.location.href = `/event/${eventId}`;
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${config.apiBaseUrl}/api/events/delete/${eventId}`
      );
      window.location.href = `/events`;
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const handleUpdate = () => {
    setEdit(true);
  };

  const handleSave = async (e) => {
    const formData = new FormData();
    formData.append("evt_name", e.target.evt_name.value);
    formData.append("date", e.target.date.value);
    formData.append("location", e.target.location.value);
    formData.append("deadline", e.target.deadline.value);
    try {
      await axios.put(
        `${config.apiBaseUrl}/api/events/update/${eventId}`,
        formData
      );
      window.location.href = `/event/${eventId}`;
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/api/events/read_by_id/${eventId}`
        );
        setEvent(response.data);
        const resUser = await axios.post(
          `${config.apiBaseUrl}/api/auth/test-token/${accessToken}`
        );
        setUser(resUser.data);
        const resPar = await axios.get(
          `${config.apiBaseUrl}/api/participants/check_if_participated/${resUser.data._id}/${eventId}`
        );
        setPar(resPar.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchData();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div className="event">
      <div className="container">
        <div className="top">
          {!edit && (
            <div className="left">
              <h1>{event.evt_name}</h1>
              <h4>
                Date:<span>{event.date}</span>
              </h4>
              <h4>
                Venue:<span>{event.location}</span>
              </h4>
              <h4>
                Deadline:<span>{event.deadline}</span>
              </h4>
              <span className="btn">
                {event.status == "accepted" &&
                  user.role_name != "Admin" &&
                  user.role_name != "Eventer" && (
                    <>
                      {par ? (
                        <span>Participated</span>
                      ) : (
                        <Link to={`/participate/${eventId}`} className="link">
                          <button>Participate</button>
                        </Link>
                      )}
                    </>
                  )}
                {user.role_name == "Admin" && (
                  <>
                    {event.status == "pending" && (
                      <span>
                        <button onClick={handleAccept}>Accept</button>
                        <button onClick={handleDelete}>Reject</button>
                      </span>
                    )}
                  </>
                )}
                {user.role_name != "Admin" && user.role_name != "Eventer" && (
                  <>
                    {event.status == "pending" && (
                      <span>
                        <h3>Coming Soon</h3>
                      </span>
                    )}
                  </>
                )}
                {user.role_name == "Eventer" && (
                  <>
                    {event.status == "pending" && (
                      <span>
                        <h3>Pending</h3>
                      </span>
                    )}
                    {event.status == "accepted" && (
                      <Link to={`/evtdetail/${eventId}`} className="link">
                        <button>Get Details</button>
                      </Link>
                    )}
                  </>
                )}
              </span>
            </div>
          )}
          {edit && (
            <div className="left">
              <form onSubmit={handleSave}>
                <span>
                  <input
                    name="evt_name"
                    type="text"
                    placeholder="Update event name"
                  />
                </span>
                <span>
                  <input
                    name="date"
                    type="text"
                    placeholder="Update event date"
                  />
                </span>
                <span>
                  <input
                    name="location"
                    type="text"
                    placeholder="Update event venue"
                  />
                </span>
                <span>
                  <input
                    name="deadline"
                    type="text"
                    placeholder="Update event deadline"
                  />
                </span>
                <button type="submit">Update Event</button>
              </form>
            </div>
          )}
          <div className="right">
            <div className="cover">
              <img src={`/${event.image_url}`} />
            </div>
            {user._id == event.user_id && (
              <div className="other">
                {!edit && <button onClick={handleUpdate}>Update</button>}
              </div>
            )}
            {user.role_name == "Admin" && (
              <div className="other">
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <div className="evtDetail">
            <h3>Event Detail</h3>
            {!edit && <p>{event.description}</p>}
          </div>
          <div className="evtGallery">
            <h3>Event Gallery</h3>
            <div className="images">
              <img src={`/${event.image_url}`} />
              <img src={`/${event.image_url}`} />
              <img src={`/${event.image_url}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
