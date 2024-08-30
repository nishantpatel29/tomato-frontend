import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './verify.css'
import axios from 'axios'
import { StoreContext } from '../../contexts/Storecontext'
import { useContext } from 'react'

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const Success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    const navigate=useNavigate()
    const {url}=useContext(StoreContext)
    
    const verifyPayment=async()=>{
        const response=await axios.post(`${url}/api/order/verify`,{Success,orderId})
        if(response.data.Success){
            navigate("/myorders")
        }else{
            navigate("/")
        }
    }
    useEffect(()=>{
verifyPayment( )
    },[])
    
  return (
    <div className="verify">
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify