import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import ProductDetailsCard from "../../components/productDetailsCard/ProductDetailsCard";

const ProductDetailsLayout = () => {    
    const [loading, setLoading] = useState(false);
    const [ product, setProduct ] = useState({})

    useEffect(() => {
        setLoading(true)
        fetch('/singleProduct.json')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProduct(data[0]);             
                setLoading(false)
            })
            .catch((error) => {
                    console.error('Error fetching Services:', error);
            });
    }, []);

    return (
        <div className="sectionBase mx-auto">
            {
                loading ? 
                ( <div className="w-full rounded-lg flex justify-center items-center h-[360px]">
                    <Loader /> 
                </div> ) :
                ( <ProductDetailsCard product={product} /> )
            }
        </div>
    );
};

export default ProductDetailsLayout;