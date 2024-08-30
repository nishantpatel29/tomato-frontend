import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <>
    <div className="footer" id='footer'>
    <div className="footer1">
      <div className="footer-first">
        <div className="footer-left-heading">
          <img src={assets.logo} alt="" />
        </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quidem ex laborum, error qui distinctio itaque, assumenda voluptatibus beatae eveniet minima? Beatae earum aperiam maiores? Sed quas molestiae ut quo.
          </p>
          <div className="social-media">
            <a href=""><img src={assets.facebook_icon} alt="" /></a>
            <a href=""><img src={assets.twitter_icon} alt="" /></a>
            <a href=""><img src={assets.linkedin_icon} alt="" /></a>
          </div>
      </div>
      <div className="footer-second">
        <h1>Company</h1>
        <ul className="second-options">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-third">
        <div className="footer-third-heading"></div>
        <h1>GET IN TOUCH</h1>
        <div className="p-gang">
        <p>+1-212-456-7890</p>
        <p>contact@tomato.com</p>
        </div>
      

      </div>
    </div>
    <div className="line">
    <hr />
    <h2 style={{color:"#ababab"}}>Copyright 2024	&#169; Tomato.com-All Right Reserved</h2>
    </div>
    </div>


    </>
  )
}

export default Footer