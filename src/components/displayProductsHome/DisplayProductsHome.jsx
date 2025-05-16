import { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../loader/Loader";

const DisplayProductsHome = ( ) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(items);
    
    useEffect(() => {
        setLoading(true)
        fetch('product_data.json')
            .then((res) => res.json())
            .then((data) => {
                setItems(data.slice(0, 6));      
                setLoading(false)           
            })
            .catch((error) => {
                console.error('Error fetching Services:', error);
            });
    }, []);


    
    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.5rem] font-bold text-center my-4">Our Products</h1>
            <div className="flex flex-wrap justify-center gap-4">
                { 
                    loading ? 
                    ( <div className="w-full rounded-lg flex justify-center items-center h-[360px]">
                        <Loader /> 
                    </div> ) :
                    items.length ? 
                    ( items.map((item) => <ProductCard key={item.id} product={item} />) ) : 
                    ( <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                        <p className="">No services available.</p>
                    </div> )
                }
            </div>
        </div>
    );
};

export default DisplayProductsHome;