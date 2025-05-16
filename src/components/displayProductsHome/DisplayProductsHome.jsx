import { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";

const DisplayProductsHome = ( ) => {
    const [items, setItems] = useState([]);
    // console.log(cat);
    
    useEffect(() => {
        fetch('')
            .then((res) => res.json())
            .then((data) => {
                setItems(data.slice(0, 6));             
            })
            .catch((error) => {
                console.error('Error fetching Services:', error);
            });
    }, []);

    
    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.5rem] font-bold text-center my-4">Our Service</h1>
            <div className="flex flex-wrap justify-center gap-4">
                { items.length > 0 ? 
                        items.map((item) => <ProductCard key={item.id} Product={item} /> )
                : (
                    <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                        <p className="">No services available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayProductsHome;