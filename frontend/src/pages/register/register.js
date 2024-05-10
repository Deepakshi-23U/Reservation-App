import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login/login.css";

function Register()
{
    const [credentials, setCredentials] = useState({
    username: null,
    password: null,
    email:null
  });

  const [error,seterror] = useState("");

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  async function handleClick(e)
  {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/auth/register", credentials, {withCredentials:true});
      console.log(res.data);
      navigate("/login")
    } 
    catch (err) {
      seterror(err.response.data);
      console.log(error);
    }
  }


  return (

    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">Register</button>
        {error && <span className="errmsg">{error}</span>}
      </div>
    </div>
  )
};

export default Register;