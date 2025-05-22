import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { useToRoute } from '../../hooks/navigation/useToRoute';
import ConfiramRemovalModal from '../confiramRemovalModal/ConfiramRemovalModal';

const MyProductCart = ({ product }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { _id:id, productName:product_name, images, brand, price, category } = product
    const goTo = useToRoute();

    const handalUpdateBtn = () => {
        goTo(`/product/${id}/update`, product)
    }

    const handalDeleteBtn = () => {
        setIsModalVisible(true)
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
                    <button onClick={handalUpdateBtn} className="py-[9px] px-4 text-white rounded-2xl grow justify-center flex items-center gap-[0.5rem] bg-[#155692] hover:bg-[#155692ce] text-[1rem] font-medium transition-all duration-200" >
                        <RxUpdate className="text-[1.3rem]"/>
                        Update
                    </button> 

                    <button onClick={handalDeleteBtn} className="py-[9px] px-4 text-white rounded-2xl grow justify-center flex items-center gap-[0.5rem] bg-[#155692] hover:bg-[#155692ce] text-[1rem] font-medium transition-all duration-200">
                        <AiTwotoneDelete className="text-[1.3rem]"/>
                        Delete
                    </button>
                </div>
            </div>

            {
                isModalVisible && <ConfiramRemovalModal id={id}/>
            }
        </div>
    );
};

export default MyProductCart;