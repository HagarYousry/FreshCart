import React, { useContext, useState, useEffect } from 'react';
import RatingStars from '../RatingStars/RatingStars';
import { Link } from 'react-router-dom';
import { addProductToCart, addProductToWishList } from '../../CartService';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export default function Product({ product }) {
  const { userToken } = useContext(AuthContext);
  const [isInWishlist, setIsInWishlist] = useState(false); 

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: {
            token: userToken,
          },
        });
        const wishlistProductIds = data.data.map((item) => item._id);
        setIsInWishlist(wishlistProductIds.includes(product._id)); 
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    }
    fetchWishlist(); 
  }, [product._id, userToken]);

  const handleWishlistToggle = async () => {
    if (isInWishlist) {
      await removeProductFromWishList(product._id);
      setIsInWishlist(false);
    } else {
      await addProductToWishList(product._id, userToken);
      setIsInWishlist(true); 
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700  hover:ring-2 hover:ring-green-300">
        <Link to={"/ProductDetails/" + product._id}>
          <img className="rounded-t-lg p-8" src={product.imageCover} alt="product image" />
        </Link>
        <div className="px-5 pb-5">
          <Link to={"/ProductDetails/" + product._id}>
            <p className='pb-2 text-green-400 dark:text-green'>{product.category.name}</p>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}</h3>
          </Link>
          <div className="flex items-center fa-xl space-x-20">
            <RatingStars rating={product.ratingsAverage} />
            <button onClick={handleWishlistToggle}>
              {isInWishlist ? (
                <FaHeart className="text-red-500 cursor-pointer" />
              ) : (
                <FaRegHeart className="text-gray-500 hover:text-red-500 cursor-pointer" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-500 dark:text-green-400">${product.price}</span>
            <button
              onClick={() => addProductToCart(product._id)}
              className="text-white bg-green-700 hover:bg-green-500 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-300"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
