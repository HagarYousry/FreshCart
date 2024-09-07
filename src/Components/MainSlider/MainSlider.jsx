import React from 'react';
import img_1 from '../../assets/imgs/slider-image-1.jpeg';
import img_2 from '../../assets/imgs/slider-image-2.jpeg';
import img_3 from '../../assets/imgs/slider-image-3.jpeg';
import img_4 from '../../assets/imgs/slider-1.jpeg';
import img_5 from '../../assets/imgs/slider-2.jpeg';
import Slider from 'react-slick';

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 '>
      <div className='md:col-span-8'>
        <Slider {...settings}>
          <img className='w-full h-[400px] object-cover' src={img_2} alt="Slider Image 2" />
          <img className='w-full h-[400px] object-cover' src={img_4} alt="Slider Image 4" />
          <img className='w-full h-[400px] object-cover' src={img_5} alt="Slider Image 5" />
        </Slider>
      </div>
      <div className='md:col-span-4 '>
        <img className='w-full h-[200px] object-cover' src={img_1} alt="Slider Image 1" />
        <img className='w-full h-[200px] object-cover' src={img_3} alt="Slider Image 3" />
      </div>
    </div>
  );
}
