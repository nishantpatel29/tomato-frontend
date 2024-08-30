import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../contexts/Storecontext'
import axios from 'axios'
import './myorders.css'
import { assets } from '../../assets/assets'


const Myorders = () => {
    let [data,setdata]=useState([])
    const {token,url}=useContext(StoreContext)
    const fetchOrders=async()=>{
        const response=await axios.post(`${url}/api/order/userorders`,{},{headers:{token}})
        setdata(response.data.data)
        
    }
    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token])
  return (
    <div className="orders" id='order' >
      <h1>My orders</h1>
      {data.map((item,index)=>{
            return(
        
                <div className="order-details" key={index}>
      
                <div className="order-img">
                  <img src={assets.parcel_icon} alt="" />
                </div>
                <div className="info">
                  <div className="food-name">
                    <p>
                        {item.items.map((a,index)=>{
                            return(
                                <b key={index}>{a.name} x {a.quantity} <br/></b>
                                
                            )
                        })}
                        </p>
                  </div>
                  <div className="address">
                    <p><b>{item.address.firstname} {item.address.lastname}</b></p>
                    <div className="address-og">
                    <p>{item.address.street},{item.address.city}</p>
                    <p>{item.address.state}, {item.address.country}, {item.address.zipcode}</p>
                    </div>
                    <p>{item.address.phone}</p>
                 
                  </div>
                </div>
                <div className="item">
                  <p>Item:{item.items.length}</p>
                </div>
                <div className="price">
                  <p>${item.amount}</p>
                </div>
                <span name="" id="">{item.status}
                </span>
        
              </div>
              
            )
        })}
    
    </div>
  )
}

export default Myorders