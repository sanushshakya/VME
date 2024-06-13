import React, { useState, useEffect } from "react";
import "./CreateEvent.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import config from "../../config";

const CreateEvent = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
  const [selectedCat, setSelectedCat] = useState("");
  const [cats, setCat] = useState([]);

  const handleCatChange = (e) => {
    setSelectedCat(e.target.value);
  };

  const schema = yup.object().shape({
    evt_name: yup.string().required("Event name is required"),
    date: yup.string().required("Date is required"),
    location: yup.string().required("Location is required"),
    deadline: yup.string().required("Deadline is required"),
    sub_title: yup.string().required("Sub Title is required"),
    description: yup.string().required("Description is required"),
    image_url: yup.mixed().required("Image is required"),
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
        const resCat = await axios.get(
          `${config.apiBaseUrl}/api/categories/read`
        );
        setCat(resCat.data);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("evt_name", data.evt_name);
    formData.append("date", moment(data.date).format("YYYY-MM-DD"));
    formData.append("cat_name", `${selectedCat}`);
    formData.append("location", data.location);
    formData.append("deadline", moment(data.deadline).format("YYYY-MM-DD"));
    formData.append("sub_title", data.sub_title);
    formData.append("description", data.description);
    formData.append("image_url", data.image_url[0]);
    formData.append("user_id", `${user._id}`);
    try {
      const resEvt = await axios.post(
        `${config.apiBaseUrl}/api/events/create`,
        formData
      );
      const eventId = resEvt.data;
      window.location.href = `/event/${eventId._id}`;
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
  if (!user) {
    window.location.href = `/login`;
  }
  if (user.role_name == "User") {
    window.location.href = `/login`;
  }
  return (
    <div className="createEvent">
      <div className="container">
        <div className="left">
          <div className="top">
            <h3>Register your Event</h3>
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
                    {...register("evt_name")}
                    type="text"
                    placeholder="Event Title"
                  />
                  <input
                    {...register("date")}
                    type="text"
                    placeholder="Date(YYYY-MM-DD)"
                  />
                </span>
                {errors.evt_name && (
                  <span className="error-message">
                    {errors.evt_name.message}
                  </span>
                )}
                {errors.date && (
                  <span className="error-message">{errors.date.message}</span>
                )}
                <span>
                  <select value={selectedCat} onChange={handleCatChange}>
                    <option value="">-- Select Category --</option>
                    {cats.map((cat) => (
                      <>
                        <option key={cat._id} value={cat.cat_name}>
                          {cat.cat_name}
                        </option>
                      </>
                    ))}
                  </select>
                  <input
                    {...register("location")}
                    type="text"
                    placeholder="Venue"
                  />
                </span>
                {errors.location && (
                  <span className="error-message">
                    {errors.location.message}
                  </span>
                )}
                <span>
                  <input
                    {...register("deadline")}
                    type="text"
                    placeholder="Deadline(YYYY-MM-DD)"
                  />
                </span>
                {errors.deadline && (
                  <span className="error-message">
                    {errors.deadline.message}
                  </span>
                )}
                <span>
                  <input
                    {...register("sub_title")}
                    type="text"
                    placeholder="Event SubTitle"
                  />
                </span>
                {errors.sub_title && (
                  <span className="error-message">
                    {errors.sub_title.message}
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

export default CreateEvent;
