
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

export default function Brands() {
  function getBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
   }
 
   const { data: brands, isLoading: brandsIsLoading }=useQuery(
     {
       queryKey:['brands'],
       queryFn:getBrands,
       select:(data)=>data.data.data
     }
     
    )
    function getSubBrands(brandId) {
      return axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands/" + brandId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    }
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const { data: subBrands, isLoading: subBrandsIsLoading } = useQuery({
      queryKey: ["subBrands", selectedBrandId],
      queryFn: () => getSubBrands(selectedBrandId),
      select: (data) => data.data.data,
      staleTime: 5000,
      refetchInterval: 8000,
      cacheTime: 500000,
      enabled: !!selectedBrandId,
    });
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleOpenModal = (brandId) => {
      setSelectedBrandId(brandId);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedBrandId(null);
    };
    
  return (
 <>
  <div className='grid grid-cols-4 gap-10'>
{
  
  brands?.map((brands,i)=><div className="bg-white shadow-sm rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 p-5 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-2 hover:border-gray-300 hover:ring-2 hover:ring-green-300" key={i}>
  
  <button onClick={()=>handleOpenModal(brands._id)}><img className="rounded-t-lg" src={brands.image }alt="" /></button>
  <h3 className='text-center pt-3 text-green-700'>{brands.name}</h3>
  </div>)
}
  </div>
   <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          isModalOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-55 fixed top-0 right-0 left-0  z-50 justify-center items-center w-full h-full md:inset-0  max-h-full`}
      >
        <div >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sub Brands
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-green-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-green-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                    <path
                     stroke="currentColor"strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4 ">
                <div className="text-center dark:text-white">
                  {
                    <div className="flex flex-col sm:flex-row sm:justify-evenly sm:items-center p-5 border-2 border-green-600 rounded-lg text-black">
                      <span className="mb-4 sm:mb-0">{subBrands?.name}</span>
                      <img
                        className="rounded-lg object-cover w-full sm:w-auto"
                        src={subBrands?.image}
                        alt={subBrands?.name}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
 </>
  )
}
