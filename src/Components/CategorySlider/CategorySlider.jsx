
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
 export default function CategorySlider() {
    const [categories, setCategories] = useState([]);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6, // Default number of slides
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024, // For devices <= 1024px
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768, // For devices <= 768px (tablets)
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480, // For devices <= 480px (mobile)
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
      async function getCategories() {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        
        setCategories(data?.data)
      }
      useEffect(() => {
        getCategories();
      }, [])
      

  return (
    <Slider {...settings}>
 {
  categories?.map((category, i) => (
    <div className="cursor-pointer p-2" key={i}>
      <img
        className="h-[200px] w-full object-cover md:h-[180px] sm:h-[150px]" // Adjust height based on screen size
        src={category.image}
        alt={category.name}
      />
      <h3 className="text-lg md:text-base sm:text-sm text-center pt-3 text-green-600">
        {category.name}
      </h3>
    </div>
  ))
}

   </Slider>
  )
}
