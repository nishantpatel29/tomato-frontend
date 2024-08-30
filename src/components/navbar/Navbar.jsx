import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../contexts/Storecontext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = ({ setShowLogin }) => {
  const {orange,token,setToken}=useContext(StoreContext)
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("")
    toast.success("logged out successfully")
    
    navigate("/")
  }
  
  return (
    <>
      <div className="navbar">
        <Link to="/"><img src={assets.logo} alt="" /></Link>
        <ul className="navlinks">
          <li className='active'><Link to='/'>home</Link></li>
          <li><a href="#menu" >menu</a></li>
          <li><a href="#mobile-app">mobile app</a></li>
          <li ><a href="#footer">contact us</a></li>
        </ul>
        <div className="other">
          {/* <img src={assets.search_icon} alt="" /> */}
          <div className={orange>0?"basket basket1":"basket"}>
            <Link to={orange>0?"/cart":"/"} ><img src={assets.basket_icon} alt="" /></Link>

          </div>
          {!token?  <button onClick={() => setShowLogin(true)}>sign in</button>: <div className='navbar-profile'>
    <img src={assets.profile_icon} alt="" />
    <ul className="nav-profile-dropdown">
        <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
        <hr />
        <li onClick={()=>logout()}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
    </ul>
</div>}
         
         

            
          
        </div>
      </div>
    </>
  )
}

export default Navbar