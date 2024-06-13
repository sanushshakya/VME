import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Register.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import config from "../../config";

const Register = () => {
  const accessToken = Cookies.get("accessToken");
  const [selectedRole, setSelectedRole] = useState("");
  const [members, setMembers] = useState([]);
  const [roles, setRole] = useState([]);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(!!Cookies.get("accessToken"));

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    // email: yup.string().email('Invalid email').required('Email is required').matches(/@prime\.com$/, 'Email must be from @prime.com domain'),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    team_name: yup.string().required("Team name is required"),
    image_url: yup.mixed().required("Profile image is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/role/read`);
        setRole(response.data);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchData();

    const fetchUser = async () => {
      try {
        const response = await axios.post(
          `${config.apiBaseUrl}/api/auth/test-token/${accessToken}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchUser();
  }, []);

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  const renderMemberInputs = () => {
    return members.map((member, index) => (
      <input
        key={index}
        type="text"
        value={member}
        onChange={(e) => handleMemberChange(index, e.target.value)}
      />
    ));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("team_name", data.team_name);
    formData.append("team_member", `${members}`);
    formData.append("role_name", `${selectedRole}`);
    formData.append("image_url", data.image_url[0]);

    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/api/user/create`,
        formData
      );
      setSuccess(true);
      // window.location.href = `/login`
      // Handle the response as needed
    } catch (error) {
      console.error(error.response?.data || error);
      // Handle the error
    }
  };
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  return (
    <div className="register">
      <div className="container">
        <div className="left">
          <Link to="/" className="link links">
            VME
          </Link>
          <h1>NAMASTE</h1>
          <img src="./img/featured1.png" />
          <h3>
            Manage your work
            <br />
            effectively with us
          </h3>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Get Started with VME!</h1>
            <div className="credentials">
              <span>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your name"
                />
                <FontAwesomeIcon icon={faUser} />
              </span>
              {errors.username && (
                <span className="error-message">{errors.username.message}</span>
              )}
              <span>
                <input
                  {...register("email")}
                  type="text"
                  placeholder="Enter your email"
                />
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
              <span>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your Password"
                />
                <FontAwesomeIcon icon={faKey} />
              </span>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
              <span>
                <input
                  {...register("team_name")}
                  type="text"
                  placeholder="Enter your Team Name"
                />
              </span>
              {errors.team_name && (
                <span className="error-message">
                  {errors.team_name.message}
                </span>
              )}
              <span>
                <div className="list">
                  <label>Team Members:</label>
                  <span>{renderMemberInputs()}</span>
                  <button
                    type="button"
                    onClick={() => setMembers([...members, ""])}
                  >
                    Add Member
                  </button>
                </div>
              </span>
              <span>
                <select value={selectedRole} onChange={handleRoleChange}>
                  <option value="">-- Select Role --</option>
                  {roles.map((role) => (
                    <>
                      <option key={role._id} value={role.name}>
                        {role.name}
                      </option>
                    </>
                  ))}
                </select>
              </span>
              <h4>Upload Profile:</h4>
              <input {...register("image_url")} type="file" />
              {errors.image_url && (
                <span className="error-message">
                  {errors.image_url.message}
                </span>
              )}
            </div>
            <button type="submit">Register</button>
            {success && (
              <div className="success-message">
                <p>Your account has been created successfully.</p>
                <br />
                <Link to="/login" className="login">
                  LogIn
                </Link>
              </div>
            )}
            {!success && (
              <h3>
                Already have an account?
                <Link to="/login" className="login">
                  LogIn
                </Link>
              </h3>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
