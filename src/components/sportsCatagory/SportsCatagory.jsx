
const SportsCatagory = () => {
    const catagory = [
        { id:235432, name:"Cricket", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fthe-tools-for-a-batsman-picture-id497203317%3Fk%3D6%26m%3D497203317%26s%3D612x612%26w%3D0%26h%3D1jrT_4Hh3kj-sw7zFzlH6PcT7fjYj7-CO8rMx81tpdE%3D&f=1&nofb=1&ipt=d8ac3b688cacd45d47934300d9e19d18d5abd8dc02a91b9405478aa3bae5022d", },
        { id:235422, name:"Football", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.forzagoal.com%2Fmedia%2Fcatalog%2Fproduct%2Ft%2Fr%2Ftraining_soccer_ball_in_orange.jpg&f=1&nofb=1&ipt=23871e2ca9e8b68352a7f278fad2abf67f47799dcf43a155fb7671f2ddbf18a5", },
        { id:235424, name:"Boxing", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-psd%2Fequipment-mock-up-boxing-sport_23-2150807074.jpg&f=1&nofb=1&ipt=75b6cfb33d2444b008dba637125fe9e322215125760f341ea8e2326b6fb51873", },
        { id:235425, name:"Badminton", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finsportzknox.com.au%2Fmc_content%2Fuploads%2F2020%2F11%2Fbadminton_racket.png&f=1&nofb=1&ipt=ca979f039533e079a9208870ee7ecaf8b07c7244c4b46a9082c1a10fc00ec04a", },
    ]
    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.5rem] font-bold text-center my-4">Sports Categorys</h1>

            <div className="flex flex-wrap justify-center">
                {
                    catagory.map((c) => (
                        <div className="relative w-1/2 md:w-1/4 max-w-52 flex flex-col justify-center items-center">
                            <img src={c.image} alt={c.name} className="w-full aspect-square object-cover" />
                            <div className="absolute inset-0"></div>
                            <p className="absolute inset-0 flex items-center hover:items-end justify-center hover:justify-start hover:m-2 text-white hover:text-black text-lg font-semibold bg-black/40 hover:bg-black/0 duration-300 transition-transform ">{c.name}</p>
                        </div>))
                }
            </div>
        </div>
    );
};

export default SportsCatagory;