import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faMapLocationDot} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Quick Line</h2>
            <Link to="/events" className="link links">Events</Link>
            <Link to="/categories" className="link links">Categories</Link>
            <Link to="/aboutus" className="link links">About us</Link>
          </div>
          <div className="item">
            <h2>Contact Us</h2>
            <Link to="/events" className="link links">
              <FontAwesomeIcon icon={faPhone} />
              <i>+977-</i>9861359639
              </Link>
            <Link to="/categories" className="link links">
              <FontAwesomeIcon icon={faEnvelope} />
              vme@company.com
            </Link>
            <Link to="/aboutus" className="link links">
              <FontAwesomeIcon icon={faMapLocationDot} />
              Nayabazar-21, Kathmandu
            </Link>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <Link to="/" className='link'>VME</Link>
          </div>
          <div className="center">
            All rights reserved. Copyright @2023
          </div>
          <div className="right">
            <Link to="/aboutus" className="link links">
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
