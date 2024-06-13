import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config";

const Profile = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(false);
  const [members, setMember] = useState([]);
  const [teams, setTeam] = useState(false);
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };
  const handleDelete = () => {
    setDel(true);
  };
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleProfileClick = () => {
    setProfile(true);
  };

  const handleTeamOn = () => {
    setTeam(true);
  };

  const handleTeamOff = () => {
    setTeam(false);
  };

  const handleSaveClick = async (e) => {
    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("password", e.target.password.value);
    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/api/user/update/${user._id}`,
        formData
      );
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image_url", e.target.elements.image_url.files[0]);
    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/api/user/update/${user._id}`,
        formData
      );
      setUser(response.data);
      setProfile(false);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleTeamUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("team_member", e.target.team_member.value);
    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/api/user/update/${user._id}`,
        formData
      );
      setUpdate(false);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleTeamDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${config.apiBaseUrl}/api/user/delete/${user._id}/${e.target.team_member_remove.value}`
      );
      setDel(false);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${config.apiBaseUrl}/api/auth/test-token/${accessToken}`
        );
        setUser(response.data);
        setMember(response.data.team_member);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchData();
  }, []);

  if (!user) {
    window.location.href = `/login`;
  }
  return (
    <div className="profile">
      <div className="container">
        <div className="top">
          <h3>Presonal Information</h3>
          <span className="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
          <div className="bio">
            <div className="left">
              {!profile && (
                <>
                  <img src={user.image_url} />
                  <button onClick={handleProfileClick}>Change Profile</button>
                </>
              )}
              {profile && (
                <form onSubmit={handleProfile}>
                  <input name="image_url" type="file" />
                  <button type="submit">Change Profile</button>
                </form>
              )}
            </div>
            <div className="right">
              <span className="name">{user.name}</span>
              <span className="email">{user.email} </span>
              <span>
                {user.role_name != "Admin" && (
                  <>
                    <Link to="/myevents" className="link">
                      <a>My Events</a>
                    </Link>
                    <button onClick={handleTeamOn}>
                      <a>My Team</a>
                    </button>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {teams && (
          <div className="team">
            <span>
              <h3>{user.team_name}</h3>
              <button onClick={handleUpdate}>
                <a>Add Members</a>
              </button>
              <button onClick={handleDelete}>
                <a>Remove Members</a>
              </button>
            </span>
            {!update && (
              <table>
                <tr>
                  <th>Name List of Team Members:</th>
                </tr>
                {members.map((mem) => (
                  <div className="list">
                    <tr>
                      <td>{mem}</td>
                    </tr>
                  </div>
                ))}
              </table>
            )}
            {update && (
              <form onSubmit={handleTeamUpdate}>
                <span>
                  <input
                    name="team_member"
                    type="text"
                    placeholder="New Member"
                  />
                </span>
                <button type="submit">Update</button>
              </form>
            )}
            {del && (
              <form onSubmit={handleTeamDelete}>
                <span>
                  <input
                    name="team_member_remove"
                    type="text"
                    placeholder="Remove Member"
                  />
                </span>
                <button type="submit">Delete</button>
              </form>
            )}
          </div>
        )}

        <div className="bottom">
          <div className="left">
            <div className="heading">
              <h3>Basic Information</h3>
              {!editing && <button onClick={handleEditClick}>Edit</button>}
            </div>
            {!editing && (
              <>
                <span className="name">{user.name}</span>
                <span className="email">{user.email}</span>
                <span className="role">{user.role_name}</span>
              </>
            )}
            {editing && (
              <form onSubmit={handleSaveClick}>
                <span>
                  <input
                    name="username"
                    type="text"
                    placeholder="Update your name"
                  />
                </span>
                <span>
                  <lable>{user.email}</lable>
                </span>
                <span>
                  <input
                    name="password"
                    type="password"
                    placeholder="Update your password"
                  />
                </span>
                <span>
                  <lable>{user.role_name}</lable>
                </span>
                <button type="submit">Save</button>
              </form>
            )}
          </div>
          <div className="right">
            <img src="./img/featured1.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
