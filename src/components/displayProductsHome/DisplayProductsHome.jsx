import Loader from "../loader/Loader";
import ProductCard from "../productCard/ProductCard"; 
import { useLoaderData } from "react-router-dom";

const DisplayProductsHome = ( ) => {
    const items = useLoaderData();
    // console.log(items);

    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.5rem] font-bold text-center my-4">Our Products</h1>
            <div className="flex flex-wrap justify-center gap-4">
                { 
                    items && items.length > 0 ? 
                    (
                        items.map((item) => <ProductCard key={item.id || item._id} product={item} />)
                    ) : 
                    items && items.length === 0 ? (
                        <div className="w-full border rounded-lg flex justify-center items-center h-[360px]">
                            <p className="">No product available.</p>
                        </div>
                    ) : 
                    (
                        <div className="w-full rounded-lg flex justify-center items-center h-[360px]">
                            <Loader /> 
                        </div>
                    )
                }
                
            </div>
        </div>
    );
};

export default DisplayProductsHome;