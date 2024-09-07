import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../RatingStars/RatingStars';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ProductsImagesSlider from '../ProductsImagesSlider/ProductsImagesSlider';
import RelatedProducts from '../MoreProducts/MoreProducts';
import { addProductToCart, addProductToWishList } from '../../CartService';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast, Bounce } from 'react-toastify';

export default function ProductDetails() {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    getProductDetails();
    fetchWishlist();
  }, [id]);

  async function getProductDetails() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
      await getRelatedProducts(data.data?.category._id);
    } catch (error) {
      console.error("Error fetching product details", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/', {
        params: {
          category: categoryId
        }
      });
      setRelatedProduct(data.data);
    } catch (error) {
      console.error("Error fetching related products", error);
    }
  }

  async function fetchWishlist() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: userToken,
        },
      });
      const wishlistProductIds = data.data.map(item => item._id);
      setIsInWishlist(wishlistProductIds.includes(id));
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
  }

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await removeProductFromWishList(productDetails._id);
        setIsInWishlist(false);
      } else {
        await addProductToWishList(productDetails._id, userToken);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Error toggling wishlist", error);
    }
  };

  async function removeProductFromWishList(productId) {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: userToken,
        }
      });
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error removing product from wishlist", error);
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="bg-white dark:bg-gray-300">
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-3/12 lg:h-96">
              <ProductsImagesSlider images={productDetails?.images} />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
              <h3 className="text-green-700 uppercase text-2xl">{productDetails?.title}</h3>
              <span className="text-yellow-700 text-lg font-bold mt-3">${productDetails?.price}</span>
              <hr className="my-3" />
              <div className="mt-3">
                <label className="text-green-700 text-xl font-bold" htmlFor="count">Ratings:</label>
                <RatingStars rating={productDetails?.ratingsAverage ?? 0} />
              </div>
              <div className="mt-3">
                <label className="text-green-700 text-xl font-bold" htmlFor="count">Description:</label>
                <h3 className='text-lg text-gray-700'>{productDetails?.description}</h3>
              </div>
              <div className="mt-3">
                <label className="text-green-700 text-xl font-bold" htmlFor="count">Category:</label>
                <div className="flex items-center mt-1">
                  <h3 className='text-lg text-gray-700'>{productDetails?.category.name}</h3>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-green-700 text-xl font-bold" htmlFor="count">Subcategory:</label>
                <div className="flex items-center mt-1">
                  <h3 className='text-lg text-gray-700'>{productDetails?.subcategory[0]?.name}</h3>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-green-700 text-xl font-bold" htmlFor="count">Brand:</label>
                <div className="flex items-center mt-1">
                  <h3 className='text-lg text-gray-700'>{productDetails?.brand.name}</h3>
                </div>
              </div>
              <div className="flex items-center mt-6">
               <Link to={"/products"}>
               <button className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
                 All Products
                </button>
               </Link>
                <button onClick={() => addProductToCart(productDetails?._id)} className="mx-2 text-green-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                  <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
                <button onClick={handleWishlistToggle}>
                  {isInWishlist ? (
                    <FaHeart className="text-red-500 cursor-pointer fa-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-500 hover:text-red-500 cursor-pointer fa-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <RelatedProducts products={relatedProduct} />
        </div>
      </main>
    </div>
  );
}
