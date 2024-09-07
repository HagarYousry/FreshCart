import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Product from '../Product/Product';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState(''); 

  function getProducts(){
   return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let {data,isLoading,isError, error}=useQuery(
    {
      queryKey:['products'],
      queryFn:getProducts,
      select:(data)=>data.data.data
    }
  )

  if (isLoading) {
    return <div><LoadingScreen/></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  
  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <input 
      type="text" 
      placeholder="Search for products..." 
      className="border-2 border-gray-300 p-2 mb-4 w-full rounded-lg focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-300"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 mx-8'>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, i) => (
          <Product product={product} key={i} />
        ))
      ) : (
        <div className='col-span-4 text-center'>
          <p className="text-gray-900 text-4xl font-bold">No products found</p>
        </div>
      )}
    </div>
  </div>
  )
}
