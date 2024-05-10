import React from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

function Navbar() {
  
  const { user } = useContext(AuthContext);
  //const { name , error } = useLogin();

  const handleClick = async (e)=>{
    try {
          const res = await axios.get("http://localhost:8800/u/logout", { withCredentials: true });
          console.log("logout?",res.data);
          localStorage.removeItem("user");
          window.location.reload();
    } 
    catch (err) {
      console.log("error",err);
    }
  }

    return (
        <div className="navheader">
        <nav>
          <div className="logo">
            <a href="#">TRAVELGO</a>
          </div>
          <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
          <input type="checkbox" className="menu-toggle" />
          <ul className="menu">
            <li><Link className="navlink" to="#">Home</Link></li>
            <li><Link className="navlink" to="#">About Us</Link></li>
            <li><Link className="navlink" to="#">Contact Us</Link></li>
            {
                user? <><span className='navusr'>{user.username}</span> <button className='navlink' onClick={handleClick}>Logout</button></>: (
                <>
                <button><Link className="navlink" to="/login">Login</Link></button>
                <button><Link className="navlink" to="/register">Register</Link></button>
                </>
              )
            }
          </ul>
        </nav>
      </div>
    );
}

export default Navbar;
