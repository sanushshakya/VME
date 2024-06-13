import React, { useState, useEffect } from "react";
import "./CreateCat.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../config";

const CreateCat = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));

  const schema = yup.object().shape({
    cat_name: yup.string().required("Category name is required"),
    description: yup.string().required("Description is required"),
    image_url: yup.mixed().required("Category image is required"),
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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("cat_name", data.cat_name);
    formData.append("description", data.description);
    formData.append("image_url", data.image_url[0]);
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/api/categories/create`,
        formData
      );
      const catId = response.data;
      window.location.href = `/category/${catId._id}`;
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
  if (!user) {
    window.location.href = `/login`;
  }
  return (
    <div className="createCat">
      <div className="container">
        <div className="left">
          <div className="top">
            <h3>Create an Category</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="bottom">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="credentials">
                <span>
                  <input
                    {...register("cat_name")}
                    type="text"
                    placeholder="Category Title"
                  />
                </span>
                {errors.cat_name && (
                  <span className="error-message">
                    {errors.cat_name.message}
                  </span>
                )}
                <span>
                  <input
                    {...register("description")}
                    type="text"
                    placeholder="Event Description"
                  />
                </span>
                {errors.description && (
                  <span className="error-message">
                    {errors.description.message}
                  </span>
                )}
                <h4>Upload Image:</h4>
                <input {...register("image_url")} type="file" />
                {errors.image_url && (
                  <span className="error-message">
                    {errors.image_url.message}
                  </span>
                )}
              </div>

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
        <div className="right">
          <img src="./img/create.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CreateCat;
