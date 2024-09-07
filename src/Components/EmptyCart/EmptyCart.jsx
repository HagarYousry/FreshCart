import { Link } from "react-router-dom";
import emptycart from "../../assets/imgs/cart.svg";


function EmptyCart() {

  return (
    <>
     <div className="h-[100vh] flex flex-col justify-center items-center">
        <img src={emptycart} alt="Empty Cart" className="w-full h-1/2 " />
        <p className="text-2xl font-bold">Your cart is empty!</p>
           <p className="text-xl font-bold text-green-600">Looks like you haven't made your choice yet...</p>
           <Link to={"/"} className="cursor-pointer text-yellow-600 inline ms-2 font-bold text-lg">Click here to start Shopping!</Link>
      </div>
    </>
  )
}

export default EmptyCart