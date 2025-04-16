import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../../../admin/src/App";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFromData((data) => ({ ...data, [name]: value }));
  };


const initPay = (order) =>{
  const options ={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:order.amount,
    currency:order.currency,
    name:'Order Payment',
    description:'Order Payment',
    order_id:order.id,
    receipt:order.receipt,
    handler:async (reponse) =>{
      console.log(reponse);
      try {
        const {data} = await axios.post(backendUrl + '/api/order/verifiyRazorpay',reponse,{headers:{token}})
  if (data.success) {
    navigate('/orders')
  setCartItems({})
  }
  
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
      
    }

  }
const rzp = new window.Razorpay(options)
rzp.open()
}

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
   
      
let orderData = {
  address:formData,
  items:orderItems,
  amount:getCartAmount() + delivery_fee
}

switch(method){
  //Api call for COD
  case 'COD':
  const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}}) 
console.log(response.data);
  
  if (response.data.success) {
    setCartItems({})
    navigate('/orders')
  }  else{
    toast.error(response.data.message)
  }
  break;

  case 'razorpay':
    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay',orderData,{headers:{token}})
   if (responseRazorpay.data.success) {
    initPay(responseRazorpay.data.order);
    
   }
 default:
      break;
}

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t "
    >
      {/* place order */}
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandle}
            name="firstName"
            value={formData.firstName}
            type="text"
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandle}
            name="lastName"
            value={formData.lastName}
            type="text"
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandle}
          value={formData.email}
          name="email"
          type="email"
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandle}
          value={formData.street}
          name="street"
          type="text"
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandle}
            value={formData.city}
            name="city"
            type="text"
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandle}
            value={formData.state}
            name="state"
            type="text"
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandle}
            value={formData.zipcode}
            name="zipcode"
            type="number"
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandle}
            value={formData.country}
            name="country"
            type="text"
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandle}
          value={formData.phone}
          name="phone"
          type="number"
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="phone"
        />
      </div>
      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full   ${
                  method === "razorpay" ? "bg-green-400" : ""
                }           `}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="razorpay-logo"
              />
            </div>
            <div
              onClick={() => setMethod("COD")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "COD" ? "bg-green-400" : ""
                }    `}
              ></p>
              <p className="text-gray-500 text-sm-font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
