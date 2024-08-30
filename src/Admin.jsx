import React from 'react'
import Sidebar from './components/sidebar/sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/add/Add'
import Lists from './pages/lists/Lists'
import Orders from './pages/orders/Orders'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
  return (
  <div className='main-container'>
    <ToastContainer/>
  <div className="app-content">
    <Sidebar/>
    <div className="middle">
    <Routes>
      <Route path='/add' element={<Add/>}/>
      <Route path='/lists' element={<Lists/>}/>
      <Route path='/orders' element={<Orders/>}/>
    </Routes>
    </div>
  </div>
  </div>
  )
}

export default Admin