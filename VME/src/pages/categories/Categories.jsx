import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./Categories.scss"
import "../../components/catCard/CatCard"
import CatCard from "../../components/catCard/CatCard"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

const Categories = () => {
  const [cats, setCats] = useState([]);
  const accessToken = Cookies.get('accessToken');
  const [user, setUser] = useState(!!Cookies.get('accessToken'));

  useEffect(()=>{
    const getCats = async () => {
      try{
        const response = await axios.get("http://localhost:8000/api/categories/read")
        setCats(response.data)
      } catch(error) {
        return error
      }
    }
    getCats();
    const fetchData = async() => {
      try{
          const response = await axios.post(`http://localhost:8000/api/auth/test-token/${accessToken}`)
          setUser(response.data)
      } catch (error){
          console.error(error.response?.data || error);
      }
    }
    fetchData();

  }, []);


  return (
    <div className='categories'>
      <div className="container">
        <div className="top">
          <div className="left">
            <h1>Categories</h1>
            <h3>Find the best event you'd like to join.</h3>
          </div>
          {user.role_name=="Admin" && (
            <div className="right">
              <Link to="/createcategory" className='link'><button>Create New Category</button></Link>
            </div>
          )}
        </div>
        <div className="cards">
          {cats.map(cat =>(
            <div className='card'>
              <CatCard key={cat._id} item={cat}/>
            </div>
            
          ) )}
        </div>
      </div>
    </div>
  )
}

export default Categories
