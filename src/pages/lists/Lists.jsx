import React, { useContext, useEffect, useState } from 'react'
import './lists.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../contexts/Storecontext';

const Lists = () => {
  const [list,setList]=useState([]);
  const {url}=useContext(StoreContext)
  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`)
    if(response.data.Success){
      setList(response.data.data)
      
    }
    else{
      toast.error("Error")
    }
  }
  const removefood=async(id)=>{
    const response=await axios.post(`${url}/api/food/remove`,{_id:id})
    if(response.data.Success){
      toast.success("food item has been removed")
    }


  }
  useEffect(()=>{
    fetchList()
  })
  return (
   <>
   <div className="lists">
    <div className="list-table">
      <h1>All Food Lists</h1>
      <table>
        <tbody>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        {list.map((ele,index)=>{
          return(
            <tr key={index}>
            <td><img src={`${url}/images/`+ele.image} alt="" /></td>
            <td>{ele.name}</td>
            <td>{ele.category}</td>
            <td>${ele.price}</td>
            <td id='x' onClick={()=>{removefood(ele._id)}} style={{cursor:"pointer"}}>x</td>
          </tr>

          )
        })}
    
        </tbody>
      </table>
    </div>
   </div>
   </>
  )
}

export default Lists