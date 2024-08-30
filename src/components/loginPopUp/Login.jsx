import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../contexts/Storecontext';


const Login = ({ setShowLogin }) => {
  let { setToken, token ,url} = useContext(StoreContext)
  const [currstate, setCurrState] = useState("Login");
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let onChangehandler = (e) => {
    let name_ = e.target.name;
    let value = e.target.value;
    setData((prev) => ({ ...prev, [name_]: value }))
  }
  let onSubmithandler = async (e) => {
    e.preventDefault()
    const newUrl = currstate === "Sign Up" ? `${url}/api/user/register` : `${url}/api/user/login`;
    const response = await axios.post(newUrl, data)
    if (response.data.Success) {
      console.log(response);
      localStorage.setItem("token", response.data.token)
      setToken(response.data.token);
      setShowLogin(false)
      console.log("login page nu. token is ",token);
      // console.log("login page nu.  localstorage token is ",localStorage.getItem("token"));
      
      toast.success(response.data.message)

    }
    else {
      toast.error(response.data.message)
    }
  }
  useEffect(() => {
    if (token) {
      console.log("login page nu. token is ", token);
      console.log("login page nu.  localstorage token is ", localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <form onSubmit={(e) => onSubmithandler(e)} className="login-popup">
      <div className="login-container">
        <div className="login-title">
          <h2>{currstate}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-input">
          {currstate == 'Sign Up' ? <input type="text" name="name" onChange={(e) => onChangehandler(e)} placeholder='Your name' required /> : null}
          <input type="text" name="email" onChange={(e) => onChangehandler(e)} placeholder='Your Email' required />
          <input type="password" name="password" onChange={(e) => onChangehandler(e)} placeholder='Password' required />

        </div>
        <button type='submit'>{currstate == 'Sign Up' ? "Create Account" : "Login"}</button>
        <div className="t-and-c">
          <input type="checkbox" checked id='check' required />
          <p><label htmlFor="check">By continuing,I agree to the  terms of use & privacy policy</label></p>
        </div>
        <div className="already">
          <p>{currstate != "Login" ? "Already have an account?" : "Want to create one?"} <span style={{ color: 'tomato', cursor: " pointer" }} onClick={() => currstate == "Login" ? setCurrState("Sign Up") : setCurrState("Login")}>{currstate != "Login" ? "Login here" : "Create an Account"} </span></p>
        </div>


      </div>
    </form>
  )
}

export default Login