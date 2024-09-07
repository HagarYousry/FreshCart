import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addProductToCart } from '../../CartService';
import { Bounce, toast } from 'react-toastify';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

export default function WishList() {
    const [wishList, setWishList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getWishList();
    }, []);

    async function getWishList() {
        setIsLoading(true);
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setWishList(data.data);
        } catch (error) {
            console.error("Error fetching wishlist", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function removeProductsFromWishList(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: {
                    token: localStorage.getItem("token")
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
            getWishList(); // Refresh the wishlist
        } catch (error) {
            console.error("Error removing item from wishlist", error);
        }
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <Helmet>
                <title>WishList</title>
            </Helmet>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-green-500 text-lg uppercase bg-gray-200 dark:bg-gray-700 dark:text-green-500">
                        <tr>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Product Name
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Add to Cart
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Price
                            </th>
                            <th scope="col" className="px-4 py-3 sm:px-6">
                                Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishList?.map((product, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-500">
                                <td className="p-4 sm:p-6">
                                    <img src={product.imageCover} className="w-16 sm:w-24 md:w-32 max-w-full max-h-full" alt="Product" />
                                </td>
                                <td className="px-4 py-4 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                    {product.title}
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => addProductToCart(product._id)}
                                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                        Add to Cart
                                    </button>
                                </td>
                                <td className="px-4 py-4 font-semibold text-gray-900 text-lg dark:text-white">
                                    ${product.price}
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => removeProductsFromWishList(product._id)}
                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 sm:px-8 sm:py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
