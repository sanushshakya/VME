import React, { useState, useEffect } from "react";
import "./Category.scss";
import EvtCard from "../../components/evtCard/EvtCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config";

const Category = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(!!Cookies.get("accessToken"));
  const { catId } = useParams();
  const [cat, setCat] = useState(null);
  const [evt, setEvt] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${config.apiBaseUrl}/api/categories/delete/${catId}`
      );
      window.location.href = `/categories`;
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const resCat = await axios.get(
          `${config.apiBaseUrl}/api/categories/read_by_id/${catId}`
        );
        const resEvt = await axios.get(
          `${config.apiBaseUrl}/api/categories/read_with_events/${resCat.data.cat_name}`
        );
        setCat(resCat.data);
        setEvt(resEvt.data);
        const resUser = await axios.post(
          `${config.apiBaseUrl}/api/auth/test-token/${accessToken}`
        );
        setUser(resUser.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCat();
  }, [catId]);
  if (!cat) {
    return <div>Loading...</div>;
  }
  return (
    <div className="category">
      <div className="container">
        <div className="top">
          <div className="left">
            <h3>{cat.cat_name}</h3>
            <p>{cat.description}</p>
          </div>
          <div className="right">
            <img src={`/${cat.image_url}`} />
            {user.role_name == "Admin" && (
              <div className="other">
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <h1>Events Organized</h1>
          <div className="cards">
            {evt.map((evt) => (
              <EvtCard key={evt._id} item={evt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
