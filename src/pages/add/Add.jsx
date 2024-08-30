import React, { useContext, useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../contexts/Storecontext';

const Add = () => {
 const {url}=useContext(StoreContext)
  let [img, setImg] = useState(false)
  let [data, setData] = useState({
    name: "",
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    price: Math.ceil(Math.random()*30)+10,
  })

  let onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }))
  }

  let onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("category", data.category)
    formData.append("price", Number(data.price))
    formData.append("image", img)
    const response = await axios.post(`${url}/api/food/add`, formData);
    console.log(response);
    

    if (response.data.Success) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      })
      setImg(false)
      toast.success(response.data.message)

    } else {
      toast.error(response.data.message)

    }
  }

  return (
    <>
      <div className="add">
        <form onSubmit={onSubmitHandler} className='add-form' >
          <div className="form-img-div">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={img ? URL.createObjectURL(img) : assets.upload_area} alt="not found" />
            </label>
            <input type="file" id='image'  onChange={(e) => { setImg(e.target.files[0]) }} required hidden />
          </div>
          <div className="product-name-div">
            <p>Product name</p>
            <input type="text" onChange={(e) => onChangeHandler(e)} name="name" required placeholder='Type here' value={data.name} />
          </div>
          <div className="description-div">
            <p>Product Description</p>
            <textarea name="description" required onChange={(e) => onChangeHandler(e)} placeholder='Write content here' value={data.description}></textarea>
          </div>
          <div className="option-div">
            <div className="one">
              <p>Product Category</p>
              <select name="category" required onChange={(e) => onChangeHandler(e)} value={data.category}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="two">
              <p>Product Price</p>
              <input type="number" required name='price' onChange={(e) => onChangeHandler(e)} placeholder='Type here' value={data.price} />
            </div>
          </div>
          <button type='submit'>ADD</button>
        </form>
      </div>
    </>
  )
}

export default Add
