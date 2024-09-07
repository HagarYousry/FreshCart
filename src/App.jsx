
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import NotFound from './Components/NotFound/NotFound'
import CounterContextProvider from './Contexts/CounterContext'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoutes from './Components/ProtectedAuthRoutes/ProtectedAuthRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import Orders from './Components/Orders/Orders'
import { Offline } from 'react-detect-offline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishList from './Components/WishList/WishList'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'

import ResetPassword from './Components/ResetPassword/ResetPassword'
function App() {
 const queryClient= new QueryClient()

  let router= createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'login',element:<ProtectedAuthRoutes><Login/></ProtectedAuthRoutes>},
      {path:'forgetpassword',element:<ProtectedAuthRoutes><ForgetPassword/></ProtectedAuthRoutes>},
      {path:'verifycode',element:<ProtectedAuthRoutes><VerifyCode/></ProtectedAuthRoutes>},
      {path:'resetpassword',element:<ProtectedAuthRoutes><ResetPassword/></ProtectedAuthRoutes>},
      {path:'register',element:<ProtectedAuthRoutes><Register/></ProtectedAuthRoutes>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'shippingAddress/:cartId',element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'*',element:<NotFound/>}
    ]}
  ])
 
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <CounterContextProvider>
<RouterProvider router={router}></RouterProvider>
<ToastContainer/>
<Offline> 
<div key="offline-message"  className='fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200'>
  Only shown offline (surprise!)
</div>
  </Offline>
</CounterContextProvider>
    </AuthContextProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
    
    </>
  )
}

export default App
