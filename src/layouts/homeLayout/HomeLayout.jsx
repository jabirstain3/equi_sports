import { BannerSlide } from "../../components/bannerSlider/BannerSlider";
import DisplayProductsHome from "../../components/displayProductsHome/DisplayProductsHome";

const HomeLayout = () => {
    return (
        <div className="w-full ">
            <BannerSlide/>
            <DisplayProductsHome/>
        </div>
    );
};

export default HomeLayout;