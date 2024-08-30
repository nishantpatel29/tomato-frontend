import React, { useContext } from 'react'
import './orders.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { StoreContext } from '../../contexts/Storecontext'

const Orders = () => {
  const {url}=useContext(StoreContext)
  let [orders, setOrders] = useState([]);
  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status: newStatus });
      if (response.data.Success) {
        // Optimistically update the orders state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        // Fetch all orders to sync with server
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating status");
    }
    


  }
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.Success) {
      setOrders(response.data.data)
      console.log(response.data.data);
    }
    else {
      toast.error("error")
    }


  }
  useEffect(() => {
    fetchAllOrders()  
  }, [])

  return (
    <div className="orders">
      <h1>Order Page</h1>
      {orders.map((item,index)=>{
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
                <select name="" id="" onChange={(e)=>statusHandler(e,item._id)} value={item.status}>
              <option value="Preparing food">Preparing food</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
        
              </div>
              
            )
        })}

    </div>
  )
}

export default Orders