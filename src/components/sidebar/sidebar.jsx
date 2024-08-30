import React, { useState } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  let [side,setSide]=useState("add");
  return (
<>
<div className="sidebar">
  <NavLink to="/admin/nishantpatel_29/add"className="side-element">
    <div className="left-icon">
      <img src={assets.add_icon} alt="" />
    </div>
    <p>Add Items</p>
  </NavLink>
  <NavLink to="/admin/nishantpatel_29/lists" className="side-element">
    <div className="left-icon">
      <img src={assets.order_icon} alt="" />
    </div>
    <p>List Items</p>
  </NavLink>
  <NavLink to="/admin/nishantpatel_29/orders" className="side-element">
    <div className="left-icon">
      <img src={assets.order_icon} alt="" />
    </div>
    <p>Orders</p>
  </NavLink>
</div>
</>
  )
}

export default Sidebar