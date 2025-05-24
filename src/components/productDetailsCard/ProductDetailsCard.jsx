import { useState, } from "react";
import { FaStar } from "react-icons/fa6"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useToast } from "../../hooks/alart/useToast";

const ProductDetailsCard = ({ product }) => {
    const toast = useToast()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [selectedColor, setSelectedColor] = useState("black")
    const [isFavorite, setIsFavorite] = useState(false)
    // console.log(product);
    

    const { productName: name = "", images = [], description = "", brand = "", price = "", colors = [], measurements = "" } = product;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    } 

    const handelAddToCart = () => {
        toast("success" , "Added to Cart Successfully.")
    }

    return (
        <div className="mx-auto px-2 py-10 sm:px-4 md:py-12">
            {
                product && 
                ( <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Left side - Image gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square">
                            {/* NEW and SALE tags */}
                            <div className="absolute top-4 left-4 z-10 space-y-2">
                                <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">NEW</span> 
                                <div className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-500 text-white">-50%</div>
                            </div>

                            {/* Main image with navigation arrows */}
                            <div className="relative h-full">
                                { 
                                    images.length > 0 && (<img src={images[currentImageIndex]} alt={`Product view ${currentImageIndex + 1}`} className="w-full h-full object-cover" />)
                                }

                                {
                                    images.length > 1 && (
                                    <>
                                        <button onClick={previousImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white" aria-label="Previous image" >
                                            <BiChevronLeft className="w-6 h-6"/>
                                        </button>

                                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white" aria-label="Next image">
                                            <BiChevronRight className="w-6 h-6"/>
                                        </button>
                                        </>
                                    )}
                            </div>
                        </div>

                        {/* Thumbnail images */}
                        <div className="flex gap-4 justify-between">
                            {
                                images.length > 0 && 
                                images.map((image, index) => (
                                    <button key={index} onClick={() => setCurrentImageIndex(index)} className={`relative transition-all duration-300 w-[8rem] aspect-square ${ currentImageIndex === index ? "ring-2 ring-[#0FABCA]" : "hover:ring-2 hover:ring-[#0FABCA]" }`} >
                                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* Right side - Product details */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="w-4 h-4 fill-black"/>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">11 Reviews</span>
                        </div>

                        <h1 className="text-[1.6rem] md:text-[1.9rem] text-gray-800 font-semibold">{name}</h1>
                        <p className="text-gray-400 text-[0.9rem]">{brand}</p>

                        <p className="text-gray-600 text-[0.9rem]">{description}</p>

                        <div className="flex items-center gap-3">
                            <span className="text-[1.5rem] text-gray-800 font-medium">${price}</span>
                        </div>

                        <div className="space-y-2 border-t border-t-gray-200 pt-4">
                            <p className="font-medium text-[0.9rem] text-gray-600">Measurements</p>
                            <p className="text-gray-800">{measurements}</p>
                        </div>

                        <div className="space-y-2 pt-2">
                            <p className="font-medium text-gray-600 text-[0.9rem]">Choose Color</p>
                            <p className="font-semibold pb-1 text-gray-800 text-[0.9rem] capitalize">{selectedColor}</p>
                            <div className="flex gap-2">
                                {
                                    colors && colors.map((color) => (
                                        <button onClick={() => setSelectedColor(color.name)} aria-label={color.name} key={color.name} className={`w-8 h-8 rounded-full ${color.value} ${ selectedColor === color.name ? "ring-2 ring-offset-2 ring-[#0FABCA]" : "" }`} >
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <button onClick={() => setIsFavorite(!isFavorite)} className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50">
                                <div className="flex items-center justify-center gap-2">
                                    {
                                        isFavorite ? (
                                                <BsHeartFill className="w-5 h-5 text-red-500"/>
                                            )
                                            : (
                                                <BsHeart className="w-5 h-5"/>
                                            )
                                        }
                                    Add to Wishlist                           
                                </div>
                            </button>
                            <button className="flex-1 py-3 px-4 rounded-lg bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90" onClick={handelAddToCart}>
                                Add to Card
                            </button>
                        </div>
                    </div>
                </div> )
            }
        </div>
    );
};

export default ProductDetailsCard;
