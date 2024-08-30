import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { assets, food_list } from '../../assets/assets'
import { StoreContext } from '../../contexts/Storecontext'
import { Navigate, useNavigate } from 'react-router-dom'

import axios from 'axios'

const Cart = () => {
  const { cartitems, setcartItems, food_list,delivery,url, removefromcart, addToCart,add_fun,total,setTotal } = useContext(StoreContext);
   const navigate=useNavigate();
  useEffect(()=>{
    add_fun()
    
  });

  return (
    <>
      <div className="cart-main">
        <div className="cart-table">
          <table>
          <tbody>
            <tr >
              <th>Items</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
            {food_list.map((item, index) => {
              if (cartitems[item._id] > 0) {
                return (
                  
                    <tr key={index}>
                      <td><img src={`${url}/images/${item.image}`} style={{ height: "7rem",width:"auto" }} alt="" /></td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td id="add-dd"><div className="exception"><img src={assets.remove_icon_red} onClick={() => {removefromcart(item._id);setTotal(total-item.price)}} />{cartitems[item._id]} <img src={assets.add_icon_green} onClick={() => {addToCart(item._id);setTotal(total+item.price)}} alt="" /></div></td>
                      <td >${item.price * cartitems[item._id]}</td>
                      <td ><img src={assets.cross_icon} className='cross' alt="" onClick={() => setcartItems(prev => ({ ...prev, [item._id]: 0 }))} /></td>
                    </tr>

                
                )


              }



            })}
            </tbody>
          </table>

        </div>
        <div className="cart-down">
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
            <button className="checkout" onClick={()=>navigate("/order")}>Proceed to Checkout</button>

          </div>  
          <div className="promocode">
            <p>If you have promo code,Enter it here</p>
            <div className="promo-main">
              <input type="text" name="promo-input" className='promo-input' id="" placeholder='Promocode' />
              <button className="apply-promo">Submit</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Cart