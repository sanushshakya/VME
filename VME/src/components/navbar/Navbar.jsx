import React, {useEffect, useState} from 'react'
import "./Navbar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';

const Navbar = () => {
    const accessToken = Cookies.get('accessToken')
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [user, setUser] = useState([]);
    const [hide, setHide] = useState(false);

    const handleLogout = () => {
        Cookies.set("accessToken", null, { path: "/", expires: new Date(0) });
        Cookies.set("refreshToken", null, { path: "/", expires: new Date(0) });
        setIsLoggedIn(false);
    };

    const handleMenu = () => {
        setHide(true)
    };
    const handleHide = () => {
        setHide(false)
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.post(`http://localhost:8000/api/auth/test-token/${accessToken}`)
                setUser(response.data)
            } catch (error){
                console.error(error.response?.data || error);
            }
        }
        fetchData()
    }, [])
  return (
    <div className='navbar'>
       <div className='container'>
            <div className='logo'>
                <Link to="/" className="link">
                    <span className="text">VME</span>
                </Link>
            </div>
            <div className='nav'>
                <ul>
                    <Link to="/events" className="link"><li><a href='#'>Events</a></li></Link>
                    <Link to="/categories" className="link"><li><a href='#'>Categories</a></li></Link>
                    <Link to="/aboutus" className="link"><li><a href='#'>About Us</a></li></Link>
                </ul>
            </div>
            {isLoggedIn ? (
                <div className='user'>
                    <Link to="/profile" className='link'>{user.name}</Link>
                    <div onClick={toggleDropdown}>
                        <img src={`/${user.image_url}`} alt="" />
                    </div>
                    
                    {dropdownVisible && (
                        <div className='dropdown'>
                            {user.role_name=="Admin" && (
                                <Link to="/register" className='link'><button>Register</button></Link>
                            )}
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                       
                    )}
                </div>
            ): (
                <>
                </>
                // <div className='button'>
                //     <Link to="/login" className='link'><button>Login</button></Link>
                // </div>
            )}
             <div className='menu'>
                <FontAwesomeIcon onClick={handleMenu} icon={faBars} size="2xl"/>
                {hide &&(
                    <div className='menu-content'>
                       <FontAwesomeIcon onClick={handleHide} icon={faCircleXmark} size="2xl" style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#000000",}} />
                        <div className='nav'>
                            <ul>
                                <Link to="/events" className="link"><li><a href='#'>Events</a></li></Link>
                                <Link to="/categories" className="link"><li><a href='#'>Categories</a></li></Link>
                                <Link to="/aboutus" className="link"><li><a href='#'>About Us</a></li></Link>
                            </ul>
                        </div>
                        {isLoggedIn ? (
                            <div className='user'>
                                <Link to="/profile" className='link links'>Profile</Link>
                                {user.role_name=="Admin" && (
                                    <Link to="/register" className='link links'>Register</Link>
                                )}
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        ): (
                        <div className='button'>
                            <Link to="/login" className='link'><button>Login</button></Link>
                        </div>
                        )}
                    </div>
                )}
            </div>
       </div>
       
    </div>
  )
}

export default Navbar
