import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContextProvider";
import { useToast } from "../../hooks/alart/useToast";
import Loader from "../../components/loader/Loader";
import { useToRoute } from "../../hooks/navigation/useToRoute";

const CreateProductLayout = () => {
    const [colors, setColors] = useState([""]);
    const [images, setImages] = useState([""]);    
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const toast = useToast();
    const goTo = useToRoute();

    const { displayName: userName, email:userEmail, } = user || { displayName:"User", email: "notavailavle", };

    const handalAddColor = () => {
        setColors([...colors, ""]);
    };

    const handalRemoveColor = (index) => {
        setColors(colors.filter((_, i) => i !== index));
    };

    const handalColorChange = (index, value) => {
        const newColors = [...colors];
        newColors[index] = value;
        setColors(newColors);
    };

    const handalAddImage = () => {
        setImages([...images, ""]);
    };

    const handalRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handalImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };

    const handalAddProduct = (e) => {
        setLoading(true)
        e.preventDefault();

        const formData = new FormData(e.target);

        const product = {
            productName: formData.get("name"),
            category: formData.get("category"),
            price: formData.get("price"),
            brand: formData.get("brand"),
            description: formData.get("description"),
            measurements: formData.get("measurements"),
            images: images.filter(i => i.trim() !== ""),
            colors: colors.filter(c => c.trim() !== ""),
            stockStatus: formData.get("stock"),
            processingTime: formData.get("processingtime"),
            rating: 0,
            userEmail: userEmail,
            userName: userName
        };
        // console.log(product);

        e.target.reset();
        setImages([]);
        setColors([]);

        fetch(`${ import.meta.env.VITE_DOMAIN}/products`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {           
                setLoading(false)
                // console.log(data);
                if(data.insertedId) {
                    toast("success" , "Product Added Successfully.")
                    goTo(`product/${data.insertedId}`)
                }
            })
            .catch((error) => {
                    console.error('Error fetching Services:', error);
            });
    };


    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.2rem] font-bold md:text-center border-b-2 border-gray-300">Add Product</h1>
            {
                loading ? 
                ( <div className="w-full rounded-lg flex justify-center items-center h-[360px]">
                    <Loader/> 
                </div> ) :
                ( 
                    <form action="" className="flex flex-col gap-2 items-start md:items-end w-full p-2" onSubmit={handalAddProduct}>
                        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-10 justify-center ">
                            <div className="w-full md:w-[44%] flex flex-col gap-2">
                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Product Name</label>
                                    <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="name" required />
                                </div>

                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Category</label>
                                    <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="category" required />
                                </div>

                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Description</label>
                                    <textarea className="border w-full rounded-md mt-1 px-4 py-1.5" rows="6"  type="text" name="description" required />
                                </div>

                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Price</label>
                                    <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="price" required />
                                </div>

                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Brand</label>
                                    <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="brand" required />
                                </div>

                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Measurements</label>
                                    <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="measurements" required />
                                </div>
                            </div>    

                            <div className="w-full md:w-[44%] flex flex-col gap-2">
                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Stock</label>
                                    <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="number" name="stock" required />
                                </div>

                                <div className="">
                                    <label htmlFor="" className="text-lg font-medium">Processing Time</label>
                                    <input className="border w-full rounded-md mt-1 px-4 py-1.5" type="text" name="processingtime" required />
                                </div>

                                <div> 
                                    <label className="text-lg font-medium">Image URL's</label>
                                    {
                                        images.map((image, idx) => (
                                            <div key={idx} className="flex gap-2 mt-1 relative">
                                                <input className="border w-full rounded-md px-4 py-1.5" type="text" name={`image-${idx}`} value={image} onChange={e => handalImageChange(idx, e.target.value)} required />
                                                
                                                {   images.length > 1 && 
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
                                        colors.map((color, idx) => (
                                            <div key={idx} className="flex gap-2 mt-1 relative">
                                                <input className="border w-full rounded-md px-4 py-1.5" type="text" name={`color-${idx}`} value={color} onChange={e => handalColorChange(idx, e.target.value)} required
                                                />

                                                {
                                                    colors.length > 1 && 
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

                        <button type="submit" className="w-48 my-4 px-4 py-2 text-white rounded-md grow justify-center flex items-center gap-[0.5rem] bg-[#155692] hover:bg-[#155692ce] text-[1rem] font-medium transition-all duration-200">Submit</button>
                    </form>
                )
            }
        </div>
    );
};

export default CreateProductLayout;
