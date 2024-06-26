import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config";

const api = axios.create({
  baseURL: `${config.apiBaseUrl}/api`,
});

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const schema = yup.object().shape({
    // username: yup.string().email('Invalid email').required('Email is required').matches(/@prime\.com$/, 'Email must be from @prime.com domain'),
    username: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const refreshAccessToken = async () => {
    setIsRefreshing(true);
    try {
      const refreshToken = Cookies.get("refreshToken");
      const response = await refreshApi.post(
        `/auth/refresh-token/${refreshToken}`
      );
      Cookies.set("accessToken", response.data.accessToken, { path: "/" });
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        isLoggedIn
      ) {
        originalRequest._retry = true;
        if (!isRefreshing) {
          await refreshAccessToken();
          return api(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/api/auth/login`,
        formData
      );
      console.log(response.data);
      const { accessToken, refreshToken } = response.data;
      Cookies.set("accessToken", accessToken, { path: "/", expires: 0.01 });
      Cookies.set("refreshToken", refreshToken, { path: "/", expires: 24 });
      window.location.href = `/`;
    } catch (error) {
      console.error(error.response?.data || error);
      setError("Wrong Credentials");
    }
  };

  return (
    <div className="login">
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
            <h1>Login to VME</h1>
            <div className="credentials">
              <span>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your email"
                />
                <FontAwesomeIcon icon={faUser} />
              </span>
              {errors.username && (
                <span className="error-message">{errors.username.message}</span>
              )}
              <span>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                />
                <FontAwesomeIcon icon={faKey} />
              </span>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
              <div className="remember">
                <Link to="#">Forgot Password?</Link>
              </div>
            </div>
            <button type="submit">Login</button>
            {error && <div className="login-error">{error}</div>}
            <h3>
              Don't have an account?{" "}
              <Link to="/register" className="sign">
                SIGN UP
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
