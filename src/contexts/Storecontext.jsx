import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    let url = "https://tomato-backend-yv6w.onrender.com";
    let [food_list, setFood_list] = useState([])
    let [cartitems, setcartItems] = useState({});
    let [total, setTotal] = useState(0);
    let [orange, setOrange] = useState(0);
    let [delivery, setdelivery] = useState(10);
    let [token, setToken] = useState()
    const loadCartData = async (token) => {
        const response = await axios.get(`${url}/api/cart/getcart`, { headers: { token } })
        setcartItems(response.data.cartData)

    }

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        setFood_list(response.data.data)


    }

    const add_fun = () => {
        let newTotal = 0;
        food_list.map((food) => {
            if (cartitems[food._id] > 0) {
                newTotal += (food.price * cartitems[food._id]);

            }

        })
        setTotal(newTotal)


    }
    const addToCart = async (itemId) => {
        if (!cartitems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
            setOrange(orange + 1)

        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            setOrange(orange + 1)


        }
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } })
        }

    }
    const removefromcart = async (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        setOrange(orange - 1)
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } })
        }

    }
    useEffect(() => {
        async function loadData() {
            await fetchList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));

            }
            if (token) {
                loadCartData(token);
            }
        }
        loadData()
    }, [token])


    const contextValue = {
        food_list,
        cartitems,
        setcartItems,
        addToCart,
        removefromcart,
        add_fun,
        total,
        setTotal,
        orange,
        delivery,
        token,
        setToken,
        url,


    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )


}
export default StoreContextProvider