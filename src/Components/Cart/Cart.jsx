import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CartProduct from '../CartProduct/CartProduct'
import { Link } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import EmptyCart from '../EmptyCart/EmptyCart'
import { Helmet } from 'react-helmet'
export default function Cart() { 
  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    getUserCart()
  },[])

 async function getUserCart() {
  setIsLoading(true)
  let{data}= await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{
      token:localStorage.getItem("token")
    }
  }).finally(()=>{
    setIsLoading(false)
  
  })
  setCart(data);
}
 function clearCart() {
 axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{
      token:localStorage.getItem("token")
    }
  }).finally(()=>{
    setCart(null)
  })
}

if(isLoading){
  return <LoadingScreen/>
}
  return (
    <>
    <Helmet>
      <title>Cart</title>
    </Helmet>

    {  cart && cart?.data.products.length !== 0 ?<div className="pt-20 bg-white dark:bg-gray-800 pb-5">
    <h1 className="mb-10 text-center text-3xl font-bold text-green-700">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
      <div className="rounded-lg md:w-2/3 ">
       {cart?.data.products.map((product,index)=>{
        return <CartProduct key={index} product={product} setCart={setCart} cart={cart}/>
       })}
        
      </div>
     
      <div className="mt-6 h-full rounded-lg border bg-green-400 dark:bg-green-700 p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-white dark:text-white font-bold text-lg">Subtotal</p>
          <p className="text-white dark:text-white font-bold text-lg">${cart?.data.totalCartPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white dark:text-white font-bold text-lg">Shipping</p>
          <p className="text-white dark:text-white font-bold text-lg">$0</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice}</p>
            <p className="text-sm text-white dark:text-white font-bold ">including VAT</p>
          </div>
        </div>
        <Link to={"/shippingAddress/"+ cart?.data._id} className="mt-6 block text-center rounded-md  py-1.5 font-medium text-black  hover:bg-green-600 bg-white text-sm px-5  dark:bg-white dark:hover:bg-green-400 dark:focus:ring-green-300">Check out</Link>
      </div>
    </div>
<button onClick={clearCart} className='text-red-500 border-2  border-red-500 rounded-md px-4 py-2 hover:text-white hover:bg-red-500 mx-auto block'>Clear cart</button>
  </div> :<>
  <EmptyCart/>
  </>}
    </>
 
  )
}
