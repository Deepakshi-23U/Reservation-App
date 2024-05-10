import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./login.css";

function Login()
{
    const [credentials, setCredentials] = useState({
    username: null,
    password: null,
  });
   
  const { loading, dispatch } = useContext(AuthContext);
  const [error, seterror] = useState("");

  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/auth/login", credentials, {withCredentials:true});
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
      navigate("/")
    } 
    catch (err) 
    {
      seterror(err.response.data);
      console.log(error);
    }
  };


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
        <br />
        <button  onClick={handleClick} className="lButton">Login</button>
        <span id="regspan">Not registered? <Link className="reglink" to="/register">Create an account</Link></span>
        {error && <span className="errmsg">{error}</span>}
      </div>
    </div>

  )
};

export default Login;