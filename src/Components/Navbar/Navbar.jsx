
import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { RiMoonClearFill,RiMoonClearLine } from "react-icons/ri";
import favIcon from '../../assets/imgs/fav.png'

export default function Navbar() {
  const [isOpen,setIsOpen]=useState(false)
 let{userToken, setUserToken}= useContext(AuthContext)
const navigate = useNavigate()
 function signOut(){
  setUserToken("")
  localStorage.removeItem("token")
  navigate('/login')
 }
  return (
    <header className="bg-gray-600 dark:bg-gray-900">
      <nav className="container mx-auto px-7 py-4 text-white dark:text-gray-200">
        <div className="flex items-center justify-between">
         <div className='flex items-center '>
         <div className=" text-white dark:text-gray-200 font-bold text-xl me-4 flex justify-end items-center">
          <img src={favIcon} className='w-10 h-7 px-0' alt="Favorite Icon" />
            <a className='text-2xl' href="#">FreshCart</a>
          </div>
          {userToken&&<div className="hidden md:block">
            <ul className="flex items-center  ">
            <li><NavLink to={"/"}className=" px-2 text-white hover:text-green-500 font-bold">Home</NavLink></li>
              <li><NavLink to={"/cart"} className=" px-2 text-white  hover:text-green-500 font-bold ">Cart</NavLink></li>
              <li><NavLink to={"/wishlist"} className=" px-2 text-white  hover:text-green-500 font-bold">Wish List</NavLink></li>
              <li><NavLink to={"/products"} className=" px-2 text-white  hover:text-green-500 font-bold">Products</NavLink></li>
              <li><NavLink to={"/brands"} className=" px-2 text-white  hover:text-green-500 font-bold">Brands</NavLink></li>
              <li><NavLink to={"/categories"} className=" px-2 text-white  hover:text-green-500 font-bold">Categories</NavLink></li>
            </ul>
          </div>}
          <div className="md:hidden">
            <button onClick={()=> setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
         </div>
         
         <div>
        <ul className='flex gap-5 '>
        {!userToken&& <>
<li><NavLink to={"/login"} className="text-white hover:text-green-500 font-bold">Log In</NavLink></li>
<li><NavLink to={"/register"} className="text-white hover:text-green-500 font-bold">Register</NavLink></li>
        </> } 
        <li className='text-2xl'>
          <ToggleMode/>
        </li>
        {userToken&& <>
          <Link to={"/cart"}>
        <button className="mx-2 text-green-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                   <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                     <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                   </svg>
                 </button>
        </Link>
         <li><button onClick={signOut} className="text-white hover:text-green-500 font-bold">Log Out</button></li>
        </>}
        </ul>
         </div>
        </div>
       {userToken&&(<div className={isOpen?"mobile-menu md:hidden":"mobile-menu md:hidden hidden"}>
          <ul className="mt-4 space-y-4">
               <li><NavLink to={"/"}className="px-2 text-white  hover:text-green-500 font-bold">Home</NavLink></li>
              <li><NavLink to={"/cart"} className="px-2 text-white  hover:text-green-500 font-bold">Cart</NavLink></li>
              <li><NavLink to={"/wishlist"} className="px-2 text-white  hover:text-green-500 font-bold">Wish List</NavLink></li>
              <li><NavLink to={"/products"} className="px-2 text-white  hover:text-green-500 font-bold">Products</NavLink></li>
              <li><NavLink to={"/brands"} className="px-2 text-white  hover:text-green-500 font-bold">Brands</NavLink></li>
              <li><NavLink to={"/catigories"} className="px-2 text-white  hover:text-green-500 font-bold">Categories</NavLink></li>
          </ul>
          

          <div className="social-media pt-5">
            <i className='mx-1 fa-brands fa-instagram text-white hover:text-green-500 dark:text-white-400 dark:hover:text-green-500 '></i>
            <i className='mx-1 fa-brands fa-facebook text-white hover:text-green-500 dark:text-white-400 dark:hover:text-green-500 '></i>
            <i className='mx-1 fa-brands fa-twitter text-white hover:text-green-500 dark:text-white-400 dark:hover:text-green-500 '></i>
            <i className='mx-1 fa-brands fa-linkedin text-white hover:text-green-500 dark:text-white-400 dark:hover:text-green-500 '></i>
            <i className='mx-1 fa-brands fa-youtube text-white hover:text-green-500 dark:text-white-400 dark:hover:text-green-500 '></i>
            <i className='mx-1 fa-brands fa-tiktok text-white hover:text-green-500 dark:text-white-400 dark:hover:text-green-500 '></i>
       
         </div>
        </div>)}
        
      </nav>
    </header>
  )
}
function ToggleMode(){
  const [isDarkMood, setisDarkMood] = useState( 
  localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) 
useEffect(() => {
const html=document.querySelector('html');
if(isDarkMood){
  html.classList.add('dark')
}else{
  html.classList.remove('dark')
}

}, [isDarkMood])

  return<>
  <button className='text-white hover:text-green-500 ' onClick={()=>setisDarkMood(!isDarkMood)}>
 { isDarkMood? <RiMoonClearLine className='text-white hover:text-green-500 '/>: <RiMoonClearFill/> }
  </button>
  </>
}