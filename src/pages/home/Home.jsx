import React, { useContext, useState } from 'react'
import './home.css'
import { assets, menu_list } from '../../assets/assets'
import { StoreContext } from '../../contexts/Storecontext'
const Home = () => {
  let [category, setcategory] = useState("all");
  let { food_list, cartitems, setcartItems,url, addToCart, removefromcart,token } = useContext(StoreContext);
return (
  <>
    <div className="main">
      <div className="main-img">
        <div className="writing">

          <h1>Order your favourite food here</h1>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
          </p>
          <button className="view-menu">View Menu</button>
        </div>
      </div>

      <div className="explore-menu" id='menu'>
        <h3>Explore our menu</h3>
        <p>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your <br /> cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className="circle-menu">

          {menu_list.map((ele, key) => {

            return (
              <div className="circle-card" onClick={() =>category==ele.menu_name?setcategory('all'):setcategory(ele.menu_name)}key={key}>
                <div className="img-div">

                  <img src={ele.menu_image} className={category == ele.menu_name ? "img-active" : null} alt="" />
                </div>
                <h4>{ele.menu_name}</h4>
              </div>

            )
          })}
        </div>

      </div>
      <hr />
      <div className="food-display">
        <h1>Top dishes near you</h1>
        <div className="food-display-list">
          {food_list.map((ele, index) => {
            if (category == ele.category || category == 'all') {
              return (
                <div className="food-card" key={ele._id}>
                  <div className="img-div" style={{ backgroundImage: `url(${url}/images/${ele.image})` }}>

                {token?(  !cartitems[ele._id] ? <img src={assets.add_icon_white} onClick={() => addToCart(ele._id)} alt="" />
                      : <div className="plus-minus">
                        <img src={assets.remove_icon_red} onClick={() => removefromcart(ele._id)} alt="" />
                        <p>{cartitems[ele._id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(ele._id)} alt="" />
                      </div>):null}
                  
          

                  </div>
                  <div className="info">
                    <div className="title-and-rating">
                      <span>{ele.name}</span>
                      <div className="rating">
                        <img src={assets.rating_starts} alt="" />
                      </div>
                    </div>
                    <div className="description">
                      <span>{ele.description}</span>
                    </div>
                    <div className="price">${ele.price} </div>
                  </div>

                </div>
              )
            }
          })}

        </div>


      </div>
      <div className="twoapp" id="mobile-app">
        <div className="twoapp-heading">
          <h1>For Better Experience Download </h1>
            <h1>Tomato App</h1>
        </div>
        <div className="two-image">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
          </div>
      </div>
    </div>

  </>
)
}

export default Home