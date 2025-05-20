import { useState } from "react";
import { useToRoute } from "../../hooks/navigation/useToRoute";
import { useToast } from "../../hooks/alart/useToast"
import { FiArrowUpRight } from "react-icons/fi";
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri";

const ProductCard = ({ product }) => {
    const goTo = useToRoute()
    const [isFavorite, setIsFavorite] = useState(false);
    const toast = useToast()
    const { _id:id, productName:product_name, images, brand, price, category } = product

    const handelDetails = () => {
        goTo(`product/${id}`);
    } 

    return (
        <div className="border border-gray-300 bg-sky-100 p-4 w-full max-w-[320px] md:max-w-[360px] relative rounded-xl overflow-hidden">

            {/* badge */}
            <span className="bg-red-500 rounded-sm px-3 py-1 text-[0.9rem] text-white absolute top-3 left-3">New Arival</span>

            {/* product image */}
            <img alt="product/image" src={images[0]} className="w-full aspect-square"/>

            {/* product details */}
            <div className="mt-2">
                <span className="text-gray-500 text-[0.9rem]">{category}</span>
                <h3 className="text-[1.1rem] font-medium mt-2">{product_name}</h3>
                <p className="text-[0.9rem] text-gray-600 mt-1">{brand}</p>
                <p className="text-[1.1rem] font-semibold mt-1 text-[#074552]">{price}</p>

                <div className="flex items-center justify-between mt-7 gap-[15px]">
                    <button className="py-[9px] px-4 text-white rounded-2xl grow justify-center flex items-center gap-[0.5rem] bg-[#155692] hover:bg-[#155692ce] text-[1rem] font-medium transition-all duration-200" onClick={handelDetails}>
                        View Details
                        <FiArrowUpRight className="text-[1.3rem]"/>
                    </button> 

                    <button className="p-[9px] rounded-full border-2 border-[#155692]">
                        {
                            isFavorite ? (
                                <RiHeartFill onClick={() => {setIsFavorite(false); toast("warn" , "Removed from Wishlist");}} className="text-red-700 text-[1.3rem]"/>
                            ) : 
                            (
                                <RiHeartAddLine onClick={() => {setIsFavorite(true); toast("success" , "Added to Wishlist");}}className="text-[#155692] text-[1.3rem]"/>
                            )
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard