import { BannerSlide } from "../../components/bannerSlider/BannerSlider";
import DisplayProductsHome from "../../components/displayProductsHome/DisplayProductsHome";
import OurClints from "../../components/ourClients/OurClints";
import Salse from "../../components/sales/Salse";
import SportsCatagory from "../../components/sportsCatagory/SportsCatagory";

const HomeLayout = () => {
    return (
        <div className="w-full ">
            <BannerSlide />
            <SportsCatagory />
            <DisplayProductsHome />
            <Salse />
            <OurClints />
        </div>
    );
};

export default HomeLayout;