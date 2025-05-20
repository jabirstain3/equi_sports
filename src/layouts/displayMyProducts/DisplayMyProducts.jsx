import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import MyProductCart from "../../components/myProductCart/MyProductCart";

const DisplayMyProducts = () => {
    const [ loading, setLoading ] = useState(false)
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch(`${import.meta.env.VITE_DOMAIN}/allproducts`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setProducts(data);             
                setLoading(false)
            })
            .catch((error) => {
                    console.error('Error fetching Services:', error);
            });
    }, []);
    
    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.5rem] font-bold text-center my-4">My Products</h1>
            {
                loading ? 
                ( 
                    <div className="w-full rounded-lg flex justify-center items-center h-[360px]">
                        <Loader /> 
                    </div> 
                ) :
                (
                    products && products.length > 0 ? 
                    (
                        <div className="flex flex-wrap justify-center gap-4 my-4">
                            { products.map((item) => <MyProductCart key={item._id} product={item} />) }
                        </div>
                    ) : 
                    (
                        <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                            <p className="">No product available.</p>
                        </div>
                    ) 
                )
            }
        </div>
    );
};

export default DisplayMyProducts;