import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useToast } from "../../hooks/alart/useToast";

const UpdateProductLayout = () => {
    const [loading, setLoading] = useState(false);
    const [ product, setProduct ] = useState({})
    const [clrs, setClrs] = useState([""]);
    const [photo, setPhoto] = useState([""]);
    const { id } = useParams()
    const toast = useToast()
    console.log(id);
    

    const { productName, brand, price, category, description, measurements, stockStatus, processingTime, rating } = product

    const handalAddColor = () => {
        setClrs([...clrs, ""]);
    };
    
    const handalRemoveColor = (index) => {
        setClrs(clrs.filter((_, i) => i !== index));
    };
    
    const handalColorChange = (index, value) => {
        const newColors = [...clrs];
        newColors[index] = value;
        setClrs(newColors);
    };
    
    const handalAddImage = () => {
        setPhoto([...photo, ""]);
    };
    
    const handalRemoveImage = (index) => {
        setPhoto(photo.filter((_, i) => i !== index));
    };
    
    const handalImageChange = (index, value) => {
        const newImages = [...photo];
        newImages[index] = value;
        setPhoto(newImages);
    };

    const handaiUpdateProduct = (e) => {
        setLoading(true)
        e.preventDefault();

        const formData = new FormData(e.target);

        const updatedProduct = {
            productName: formData.get("name"),
            category: formData.get("category"),
            price: formData.get("price"),
            brand: formData.get("brand"),
            description: formData.get("description"),
            measurements: formData.get("measurements"),
            images: photo.filter(i => i.trim() !== ""),
            colors: clrs.filter(c => c.trim() !== ""),
            stockStatus: formData.get("stock"),
            processingTime: formData.get("processingtime"),
            rating: formData.get("rating"),
        };
        // console.log(updatedProduct);

        e.target.reset();

        fetch(`${ import.meta.env.VITE_DOMAIN}/products/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {           
                setLoading(false)
                // console.log(data);
                setProduct(updatedProduct)
                if(data.modifiedCount > 0) {
                    toast("success" , "Product Updated Successfully.");
                }
            })
            .catch((error) => {
                    console.error('Error fetching Services:', error);
            });
    };
        
    useEffect(() => {
        setLoading(true)
        fetch(`${import.meta.env.VITE_DOMAIN}/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setProduct(data);             
            setLoading(false);
            setClrs(data.colors);
            setPhoto(data.images)
        })
        .catch((error) => {
            console.error('Error fetching Services:', error);
        });
    }, [id]);

    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.2rem] font-bold md:text-center border-b-2 border-gray-300">Update Product</h1>
            {
                loading ?
                (
                    <div className="w-full rounded-lg flex justify-center items-center h-[360px]">
                        <Loader/> 
                    </div> 
                ):
                (
                    product && (
                        <form action="" className="flex flex-col gap-2 items-start md:items-end w-full p-2" onSubmit={handaiUpdateProduct}>
                            <div className="w-full flex flex-col md:flex-row gap-2 md:gap-10 justify-center ">
                                <div className="w-full md:w-[44%] flex flex-col gap-2">
                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Product Name</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="name" defaultValue={productName} required />
                                    </div>

                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Category</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="category" defaultValue={category} required />
                                    </div>

                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Description</label>
                                        <textarea className="border w-full rounded-md mt-1 px-4 py-1.5" rows="6"  type="text" name="description" defaultValue={description} required />
                                    </div>

                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Price</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="price" defaultValue={price} required />
                                    </div>

                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Brand</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="brand" defaultValue={brand} required />
                                    </div>

                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Measurements</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="measurements" defaultValue={measurements} required />
                                    </div>

                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Ratings</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="rating" defaultValue={rating} required />
                                    </div>
                                </div>    

                                <div className="w-full md:w-[44%] flex flex-col gap-2">
                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Stock</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="number" name="stock" defaultValue={stockStatus} required />
                                    </div>

                                    <div className="">
                                        <label htmlFor="" className="text-lg font-medium">Processing Time</label>
                                        <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="processingtime" defaultValue={processingTime} required />
                                    </div>

                                    <div> 
                                        <label className="text-lg font-medium">Image URL's</label>
                                        {
                                            photo?.map((image, idx) => (
                                                <div key={idx} className="flex gap-2 mt-1 relative">
                                                    <input className="border w-full rounded-md px-4 py-1.5" type="text" name={`image-${idx}`} defaultValue={image} onChange={e => handalImageChange(idx, e.target.value)} required />
                                                    
                                                    {   photo.length > 1 && 
                                                        (
                                                            <button type="button" onClick={() => handalRemoveImage(idx)} className="px-2 text-red-500 absolute right-1 top-2">Remove</button>
                                                        )
                                                    }
                                                </div>
                                            ))
                                        }

                                        <button type="button" onClick={handalAddImage} className="mt-2 px-3 py-1 bg-blue-200/40 rounded">Add Image</button>
                                    </div>

                                    <div>
                                        <label className="text-lg font-medium">Colors</label>
                                        {
                                            clrs?.map((color, idx) => (
                                                <div key={idx} className="flex gap-2 mt-1 relative">
                                                    <input className="border w-full rounded-md px-4 py-1.5" type="text" name={`color-${idx}`} defaultValue={color} onChange={e => handalColorChange(idx, e.target.value)} required
                                                    />

                                                    {
                                                        clrs.length > 1 && 
                                                        (
                                                            <button type="button" onClick={() => handalRemoveColor(idx)} className="px-2 text-red-500 absolute right-1 top-2">Remove</button>
                                                        )
                                                    }
                                                </div>
                                            ))
                                        }

                                        <button type="button" onClick={handalAddColor} className="mt-2 px-3 py-1 bg-blue-200/40 rounded">Add Color</button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-52 my-4 px-4 py-2 text-white rounded-md grow justify-center flex items-center gap-[0.5rem] bg-[#155692] hover:bg-[#155692ce] text-[1rem] font-medium transition-all duration-200">Save Changes</button>
                        </form>
                    )
                )
            }

        </div>
    );
};

export default UpdateProductLayout;


