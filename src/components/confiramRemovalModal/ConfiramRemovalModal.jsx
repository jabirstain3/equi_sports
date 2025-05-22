
import {useState} from "react";
import {RxCross1} from "react-icons/rx";
import { useToast } from "../../hooks/alart/useToast";

const ConfiramRemovalModal = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const toast = useToast();

    const HandalDelete = () => {
        fetch(`${ import.meta.env.VITE_DOMAIN}/products/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {           
                // console.log(data);
                setIsModalOpen(false)
                if(data.deletedCount > 0) {
                    toast("success" , "Product Deleted Successfully.");
                }
            })
            .catch((error) => {
                    console.error('Error fetching Services:', error);
            });
    }

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[30%] bg-[#fff] rounded-lg p-5 transition-all duration-300 z-[999]`}
            >
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-[#000] text-[1.3rem] font-[500]">
                        Delete Product
                    </h2>
                    <RxCross1
                        className="p-2 text-[2rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[#424242] text-[1rem] font-[400]">
                        Are You sure want to delete it?
                    </p>

                    <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className={`py-2 px-6 rounded font-[500] z-10 border border-[#cecece] text-gray-500`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={HandalDelete}
                            className="bg-red-600 text-white border-red-600 py-2 px-6 border rounded font-[500]"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default ConfiramRemovalModal;          