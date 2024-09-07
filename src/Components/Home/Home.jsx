import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';


export default function Home() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {     
    getProducts();          
  }, []);

  async function getProducts(){
    setIsLoading(true);
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
      <MainSlider />
      <CategorySlider />
      <div className='p-10'>
        <input type="text" placeholder="Search for products..." className="border-2 border-gray-300 p-2 mb-4 w-full rounded-lg focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-300"  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 mx-8'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Product product={product} key={index} />
          ))
        ) : (
          <div className='flex justify-center items-center w-full col-span-4'>
      <p className='text-gray-900 text-center text-4xl font-bold'>No products found</p>
    </div>
        )}
      </div>
    </>
  );
}
