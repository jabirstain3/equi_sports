import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination, Autoplay } from 'swiper/modules';

export const BannerSlide = () => {
    const banners = [
        {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.sastorage.com%2Fwp-content%2Fuploads%2F2024%2F07%2Fscore-more-space-organizing-sports-gear.jpg&f=1&nofb=1&ipt=c5d81942882787744ee6481eba5330267cbd48e1a3c3326c61fa7d38667e6bc7", id: 12300421 },
        {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.MO_eEWyfAy2-CcnD83PYtgHaE-%26pid%3DApi&f=1&ipt=19c6cb21ccdfbd14b280ede5e786f5415b7dafe147249665744d965f6f12e670&ipo=images", id: 12300423 },
        {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP._yL7hCZzkKg61hKi25DrvAHaE7%26pid%3DApi&f=1&ipt=b118e7463cc97726d23bf1f14c5b72cef52aa91e19528f830faef6969ce23ebe&ipo=images", id: 12300423 },
        {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fc5%2F83%2Fcf%2Fc583cf2890817451506009d2c6721967.jpg&f=1&nofb=1&ipt=abc86bd161ab747e347a7a8ef5e47cf59d80d96366be0d916fdee940f8eb42c4", id: 12300424 },
    ]

    return (
        <div className="w-full bannercontainer">
            <Swiper
            // install Swiper modules
            modules={[ Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: true,
            }}
            >
                {
                    banners.map((bnr) =>(
                        <SwiperSlide >
                            <div key={bnr.id} className=" w-full h-full flex justify-center bg-neutral-200">
                                <img src={bnr.image} className='w-full max-w-[1600px] h-full max-h-[700px] aspect-[19/10]'/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};