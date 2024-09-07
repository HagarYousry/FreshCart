import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';


export default function ShippingAddress() {
    const{cartId}=useParams()
    const [isLoading, setIsLoading] = useState(false)
 
 let{handleSubmit, values, handleChange, errors, handleBlur, touched}= useFormik({
    initialValues:{
    "details":"",
    "phone":"",
    "city":""
    },
    onSubmit,

  validationSchema:Yup.object({
    details:Yup.string().required("Details is required"),
    phone:Yup.string().required("Phone is required"),
    city:Yup.string().required("City is required"),
   
  })
  })
    async function onSubmit(){

        setIsLoading(true)
        console.log(values);
        
     await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,{shippingAddress:values},
     {   headers:{
            token:localStorage.getItem("token")
     },
     params:{
        url:'http://localhost:5173'
     }
    }
    ).then(({data})=>{
       setIsLoading(false)
       console.log(data.session.url);
       location.href=data.session.url;
       
      }).catch((err)=>{
        setIsLoading(false);
       
      })
      
    }
  return (
    
 <div className="py-12 flex items-center justify-center">
     <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
  <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Add your shipping address</h1>
  <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

    <div className="flex items-start flex-col justify-start">
      <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Details:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" id="details" name="details" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
      {touched.details&&errors.details&&<p className='text-red-500'>{errors.details}</p>}
    </div>
    <div className="flex items-start flex-col justify-start">
      <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
      {touched.phone&&errors.phone&&<p className='text-red-500'>{errors.phone}</p>}
    </div>
    <div className="flex items-start flex-col justify-start">
      <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">City:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" id="city" name="city" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
      {touched.city&&errors.city&&<p className='text-red-500'>{errors.city}</p>}
    </div>

    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"disabled={isLoading}> CheckOut {isLoading&& <i i className='fas fa-spinner fa-spin'></i>}</button>
    
  </form>

</div>
 </div>

  ) 
}
