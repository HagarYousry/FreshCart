import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';


export default function ForgetPassword() {
  const [isLoading,setIsLoading]=useState(false)
  const [errMsg,setErrMsg]=useState("")
 const navigate=useNavigate()
 

 let{handleSubmit, values, handleChange, errors, handleBlur, touched}= useFormik({
    initialValues:{
     
    "email":"",
    
    },
    onSubmit:ForgetPassword,

  validationSchema:Yup.object({
    email:Yup.string().required("Email is required").email("Email is valid"),
  })
  })

    async function ForgetPassword(){
      setErrMsg("");
      setIsLoading(true);

      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values).then(({data})=>{
        setIsLoading(false);
        setTimeout(() => {
            navigate("/verifycode");
          }, 600);
          localStorage.setItem("userEmail", values.email);
      }).catch((err)=>{
        setIsLoading(false);
        setErrMsg(err.response.data.message);
      })
      
    }
  return (
    
 <>
 <Helmet>
  <title>Forget Password</title>
 </Helmet>
 <div className="py-12 flex items-center justify-center">
     <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
  <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
  <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

    <div className="flex items-start flex-col justify-start">
      <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
      {touched.email&&errors.email&&<p className='text-red-500'>{errors.email}</p>}
    </div>

    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"disabled={isLoading}> Forget Password {isLoading&& <i i className='fas fa-spinner fa-spin'></i>}</button>
    {errMsg&&<p className='text-red-500'>{errMsg}</p>}
  </form>
</div>
 </div>
 </>

  ) 
}
