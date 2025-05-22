import { useEffect, useState } from 'react';
import ProductsTable from '../../components/productsTable/ProductsTable';
import Loader from '../../components/loader/Loader';

const DisplayAllProductsLayout = () => {
    const [ loading, setLoading ] = useState(false)
    const [ products, setProducts ] = useState([])
    
    document.title = "Equi Sports - All Products";

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
            <h1 className="text-[2.2rem] font-bold md:text-center border-b-2 border-gray-300">All Products</h1>

            {
                loading ? 
                ( <div className="w-full rounded-lg flex justify-center items-center h-[360px]">
                    <Loader /> 
                </div> ) :
                ( <ProductsTable products={products} /> )
            }
        </div>
    );
};

export default DisplayAllProductsLayout;