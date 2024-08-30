import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Login from './components/loginPopUp/Login'
import { ToastContainer } from 'react-toastify'
import Placeorder from './pages/placeOrder/Placeorder'
import Cart from './pages/cart/Cart'
import Verify from './pages/verify/verify'
import Myorders from './pages/myorders/myorders'
import Admin from './Admin'


const App = () => {
  let [showLogin, setShowLogin] = useState(false)
  return (
    <>
        <ToastContainer/>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Placeorder />} />
            <Route path='/verify' element={<Verify/>} />
            <Route path='/myorders' element={<Myorders />} />
            <Route path='/admin/nishantpatel_29/*' element={<Admin />} />
          </Routes>
          <Footer />

      </div>
    </>
  )
}

export default App