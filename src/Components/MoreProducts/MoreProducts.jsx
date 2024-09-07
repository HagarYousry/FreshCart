import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import { addProductToCart} from '../../CartService';

export default function MoreProducts({products}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
      
  return (
    <div className="mt-16 ">
    <h3 className="text-green-600 text-2xl font-medium">More Products</h3>
   
      <Slider {...settings}>
      {products.map((product,index)=>{
           return <div key={index} className="w-full max-w-sm mx-auto rounded-md p-2 overflow-hidden ">
           <div className='hover:shadow-green-600  shadow-md  rounded-mg  hover:ring-2 hover:ring-green-300 '>
           <Link to={"/productDetails/"+ product._id}>
           <div className="flex items-end justify-end h-60 w-full bg-cover" style={{"background-image": `url(${product.imageCover})`}}>
                <button onClick={()=>addProductToCart(product._id)} className="p-2 rounded-full bg-green-600 text-white mx-5 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500">
                    <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
            </div>
            </Link>
            <div className="px-5 py-3 bg-gray-200 dark:bg-gray-400  shadow-md ">
              <Link to={"/productDetails/"+ product._id}>
              <h3 className="text-green-700 uppercase">{product.title}</h3>
              </Link>
           <div className='flex items-center fa-xl space-x-5' >
            <span className="text-yellow-700 mt-2 mb-5">${product.price}</span>
            
          </div>
            </div>
           </div>
        </div>
        })}
      </Slider>
  
</div>
  )
}
