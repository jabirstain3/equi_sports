import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import ProductDetailsCard from "../../components/productDetailsCard/ProductDetailsCard";
import { useParams } from "react-router-dom";

const ProductDetailsLayout = () => {    
    const [loading, setLoading] = useState(false);
    const [ product, setProduct ] = useState({})
    const params = useParams();
    // console.log(params);

    document.title = `Equi Sports - ${product.productName || "product"}`;


    useEffect(() => {
        setLoading(true)
        fetch(`${import.meta.env.VITE_DOMAIN}/products/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setProduct(data);             
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