
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';


export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
   }
 
   const { data: categoriesData, isLoading: isCategoriesLoading } =useQuery(
     {
       queryKey:['categories'],
       queryFn:getCategories,
       select:(data)=>data.data.data
     }
     
    )
    

    const { data: subCategoriesData, isLoading: isSubCategoriesLoading } = useQuery({
      queryKey: ["subCategories", selectedCategoryId],
      queryFn: () =>
        axios
          .get(
            `https://ecommerce.routemisr.com/api/v1/categories/${selectedCategoryId}/subcategories`,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then((res) => res.data.data),
      enabled: !!selectedCategoryId,
      staleTime: 5000,
      refetchInterval: 8000,
      cacheTime: 500000,
    });

  
    const handleOpenModal = (categoryId) => {
     setSelectedCategoryId(categoryId); 
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedCategoryId(null); 
    };
  
  
  return (
    <>
  <div className='grid grid-cols-4 gap-10'>
{
  
  categoriesData?.map((category,i)=><div  className="bg-white shadow-sm rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 p-5 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-2 hover:border-gray-300 hover:ring-2 hover:ring-green-400"key={i}>
  
  <button onClick={()=>handleOpenModal(category._id)}><img className="h-[300px] w-full object-cover rounded-t-lg" src={category.image }alt="" /></button>
  <h3 className='text-center pt-3 text-green-700'>{category.name}</h3>
  </div>)
}
  </div>
  {isCategoriesLoading || isSubCategoriesLoading ? (
        <LoadingScreen />
      ) :( <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          isModalOpen ? "flex" : "hidden"
        } overflow-y-auto  overflow-x-hidden bg-gray-500 bg-opacity-55 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full md:inset-0 max-h-full`}
      >
        <div>
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sub Categories
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-green-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-green-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 text-center dark:text-white">
                  {subCategoriesData?.map((subCate, index) => (
                    <span
                      key={index}
                      className="p-3 sm:p-4 object-contain  text-center border-2 border-green-600 rounded-lg w-full"
                    >
                      {subCate.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
   
</>
  )
}
