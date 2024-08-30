import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'

import { StoreContext } from '../../contexts/Storecontext';
import axios from 'axios';

const Placeorder = () => {
  const { total,delivery,token,food_list,url,cartitems,add_fun} = useContext(StoreContext);    
  const [data,setdata]=useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  useEffect(()=>{
    add_fun()
  })
const onChangehandler=(e)=>{
  e.preventDefault();
  let name_=e.target.name;
  let value=e.target.value;
  setdata((prev)=>({...prev,[name_]:value}))
  

}

const onSubmitHandler=async(e)=>{
  e.preventDefault()
  let orderItems=[];
  food_list.map((item)=>{
    if(cartitems[item._id]>0){
      let itemInfo=item;
      itemInfo["quantity"]=cartitems[item._id]
      orderItems.push(itemInfo)
    }
  })
  let orderData={
    address:data,
    items:orderItems,
    amount:total+delivery
  }
  console.log(orderData);
  
  let response=await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
  console.log(response);
  
  if(response.data.Success){
    const {session_url}=response.data;
    window.location.replace(session_url)
  }
  else{
    alert("error")
  }
  
  
}

  return (
    <>
    <div className="placeorder">
      <form onSubmit={onSubmitHandler} className="placeorder-container">
        
      <div className="form-div">

        <h1>Delivery Information</h1>
      <div className='yo' >
        <div className="name">
          <input type="text" onChange={(e)=>{onChangehandler(e)}} value={data.firstname} name="firstname" className='firstname' placeholder='First name' required />
          <input type="text" onChange={(e)=>{onChangehandler(e)}} value={data.lastname} name="lastname" className='lastname' placeholder='Last name' required />
        </div>
        <input type="text" onChange={(e)=>{onChangehandler(e)}}  value={data.email} name="email" className='email' placeholder='Email address' required />
        <input type="text" onChange={(e)=>{onChangehandler(e)}}  value={data.street} name="street" placeholder='Street' className="street" required />
        <div className="name">
          <input type="text" onChange={(e)=>{onChangehandler(e)}} value={data.city} name="city" className='firstname' placeholder='City' required />
          <input type="text" onChange={(e)=>{onChangehandler(e)}}  value={data.state} name="state" className='state' placeholder='State' required />
        </div>  <div className="name">
          <input type="text" onChange={(e)=>{onChangehandler(e)}}  value={data.zipcode} name="zipcode" className='zipcode' placeholder='Zip code' required />
          <input type="text" onChange={(e)=>{onChangehandler(e)}}  value={data.country} name="country" className='country' placeholder='Country' required />
        </div>
        <input type="text" onChange={(e)=>{onChangehandler(e)}} name="phone"value={data.phone}  className="phone" placeholder='Phone' required />

      </div>
    </div>
    <div className="form-right">
      <div className="total">
            <h1>Cart Total</h1>
            <div className="total-main">
              <div className="total-1 tt">
                <p>Subtotal</p>
                <p>${total}</p>
              </div>
              <div className="total-1 tt">
                <p>Delivery Fee</p>
                <p>${delivery}</p>
              </div>
              <div className="total-1" id="total">
                <p><b>Total</b></p>
                <p><b>${total+delivery}</b></p>

              </div>
            </div>
            <button className="checkout" type='submit'>Proceed to Payment</button>

          </div>  
    </div>

    </form>

      </div>

    </>
  )
}

export default Placeorder