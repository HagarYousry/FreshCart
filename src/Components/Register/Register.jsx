import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

  const [isLoading,setIsLoading]=useState(false)
  const [errMsg,setErrMsg]=useState("")
  const [sucssMsg,setSucssMsg]=useState("")
  const navigate=useNavigate()
 

 let{handleSubmit, values, handleChange, errors, handleBlur, touched}= useFormik({
    initialValues:{
      "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
    },
    onSubmit:register,
  validationSchema:Yup.object({
    name:Yup.string().required("Name is required").min(3,"Name is less than 3 characters").max(20,"Name is more than 20 characters"),
    email:Yup.string().required("Email is required").email("Email is valid"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
    rePassword:Yup.string().required("rePassword didn't match Password").oneOf([Yup.ref("password")],"rePassword didn't match Password"),
    phone:Yup.string().required("phone is required")
  })
  })

    async function register(){
      setSucssMsg("");
      setErrMsg("");

      setIsLoading(true);
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then((response)=>{
      setIsLoading(false);
      console.log(response.data);
      setSucssMsg(response.data.message);
     setTimeout(() => {
      navigate("/login")
     }, 500);
    }).catch((err)=>{
      setIsLoading(false);
      console.log(err?.response.data.message);
      setErrMsg(err?.response.data.message);
      
    })
        
    }
  return (
<>
    <Helmet>
      <title>Register</title>
    </Helmet>
<div className="min-h-screen flex items-center justify-center">
     <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
  <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
  <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
    <div className="flex items-start flex-col justify-start">
      <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
     {touched.name&&errors.name&& <p className='text-red-500'>{errors.name}</p>}
    </div>

    <div className="flex items-start flex-col justify-start">
      <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
      {touched.email&&errors.email&&<p className='text-red-500'>{errors.email}</p>}
    </div>

    <div className="flex items-start flex-col justify-start">
      <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
      {touched.password&&errors.password&&<p className='text-red-500'>{errors.password}</p>}
    </div>

    <div className="flex items-start flex-col justify-start">
      <label htmlFor="rePassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2"> rePassword:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="rePassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
     {touched.rePassword&&errors.rePassword&& <p className='text-red-500'>{errors.rePassword}</p>}
    </div>
    <div className="flex items-start flex-col justify-start">
      <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone Number:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"/>
      {touched.phone&&errors.phone&&<p className='text-red-500'>{errors.phone}</p>}
    </div>

    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-500" disabled={isLoading}> Register{isLoading&& <i i className='fas fa-spinner fa-spin'></i>} </button>
    {sucssMsg&&<p className='text-green-500'>{sucssMsg}</p>}
    {errMsg&&<p className='text-red-500'>{errMsg}</p>}
  </form>

  <div className="mt-4 text-center">
    <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
    <Link to={"/login"} className="text-green-500 hover:text-green-600">Log In</Link>
  </div>
 
</div>
 </div>

</>
  ) 
}
