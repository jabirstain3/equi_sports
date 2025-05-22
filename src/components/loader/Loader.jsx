import Lottie from "lottie-react";
import animation from "../../lottie/Animation-1747927655528.json"
const Loader = () => {
    return (
        // <div className="w-7 h-7 animate-[ping_2s_linear_infinite] rounded-full border-2 border-[#3b9df8] flex items-center justify-center">
        //     <div className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] rounded-full border-2 border-[#3b9df8]"></div> 
        // </div>
        <div>
            <Lottie loop={true} autoplay={true} animationData={animation} height={20} width={20} />
        </div>
    );
};

export default Loader;