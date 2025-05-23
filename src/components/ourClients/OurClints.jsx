
const OurClints = () => {
    const clients = [
        {id:21425, namr:"BKSP", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwikiwandv2-19431.kxcdn.com%2F_next%2Fimage%3Furl%3Dhttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F3%2F36%2FBangladesh_Krira_Shikkha_Protishtan_%252528BKSP%252529_Logo.svg%2F640px-Bangladesh_Krira_Shikkha_Protishtan_%252528BKSP%252529_Logo.svg.png%26w%3D640%26q%3D50&f=1&nofb=1&ipt=aaaa2342cd6e987b38201fdcad97c67a18de7fe4a2c6c1e41a882480bfd983a0",},
        {id:21405, namr:"CV", image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ORulI2oo3CEf-t-gzPvrtAAAAA%26cb%3Diwp2%26pid%3DApi&f=1&ipt=344279e784ba7a8f95057d2272be1c15f1e16ccbb9f276c2d5c307c373235cec&ipo=images",},
        {id:21428, namr:"Prime Bank", image:"https://www.lifespringint.com/wp-content/uploads/2023/11/10.png.webp",},
        {id:21425, namr:"Rupain City", image:"https://shahsports.com.bd/wp-content/uploads/2024/06/Rupayan-City-Uttara.png",},
        {id:21425, namr:"DIU", image:"https://shahsports.com.bd/wp-content/uploads/2024/06/Daffodil-International-University.jpg",},
        {id:21425, namr:"IU", image:"https://shahsports.com.bd/wp-content/uploads/2024/06/Independent-University.jpg",},
    ]
    return (
        <div className="sectionBase mx-auto my-4">
            <h1 className="text-[2.5rem] font-bold text-center my-4">Our Clients</h1>

            <div className="flex flex-wrap justify-center gap-4">
                {
                    clients.map((client) => (
                    <div className=" w-52 flex flex-col justify-center items-center">
                        <img src={client.image} alt={client.name} className="w-2/3"/>
                    </div>))
                }
            </div>
        </div>
    );
};

export default OurClints;