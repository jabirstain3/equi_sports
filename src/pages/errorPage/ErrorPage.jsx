import {FaArrowLeftLong} from "react-icons/fa6";
import { useToRoute } from "../../hooks/navigation/useToRoute";

const ErrorPage = () => {
    document.title = "Equi Sports - Page not found";
    const goTo = useToRoute();
    
    return (
        <div className="boxShadow px-10 w-full h-screen flex items-center flex-col justify-center pb-[50px] rounded-xl">
            <img src="https://i.ibb.co/nP1Cngw/Error-Server-1.png"  alt="illustration" className="w-full lg:w-[500px]"/>
            <h1 className="text-[#155692] text-[1.8rem] sm:text-[2.5rem] font-[800] mt-3 w-full lg:w-[55%] text-center">Thunder 404</h1>

            <button className="py-3 px-6 sm:px-8 rounded-full bg-[#fff] text-[#155692] border border-[#155692] mt-4 flex items-center gap-[10px]" onClick={() => goTo('/')}>
                <FaArrowLeftLong/> Back to home
            </button>
        </div>
    );
};

export default ErrorPage;
                    