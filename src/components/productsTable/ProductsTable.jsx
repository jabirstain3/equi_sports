
import {useEffect, useMemo, useState} from "react";
// import {HiOutlineArrowsUpDown} from "react-icons/hi2";
import {BsThreeDotsVertical} from "react-icons/bs";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {IoEyeOutline} from "react-icons/io5";
import { useToRoute } from "../../hooks/navigation/useToRoute";

const ProductsTable = ({ products }) => {
    const columns = ["productName", "category", "price", "stockStatus"];
    const goTo = useToRoute()
    const initialData = [
        {
            productName: "John Doe",
            category: "john@example.com",
            price: "Admin",
            stockStatus: "Active",
        },
    ];

    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    useEffect(() => {
        setData(products);
    }, [products]);

    const toggleActionMenu = (id) => {
        setOpenActionMenuId(openActionMenuId === id ? null : id);
    };

    const handalViewDetails = ( id ) => {
        // console.log(id)
        goTo(`/product/${id}`)
    }

    // Handle search
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            columns.some((key) =>
                (item[key] || "").toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    // Handle sort
    // const handleSort = (key) => {
    //     let direction = "asc";
    //     if (sortConfig.key === key && sortConfig.direction === "asc") {
    //         direction = "desc";
    //     }
    //     setSortConfig({ key, direction });
    // };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            if ((a[sortConfig.key] || "") < (b[sortConfig.key] || "")) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if ((a[sortConfig.key] || "") > (b[sortConfig.key] || "")) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    useEffect(() => {
        const handleCLick = (event) => {
            if (
                !event.target.closest(".zenui-table") &&
                !event.target.closest(".action-btn")
            ) {
                setOpenActionMenuId(null);
            }
        };
        document.addEventListener("click", handleCLick);
        return () => document.removeEventListener("click", handleCLick);
    }, [])

    return (
        <div className="customTable overflow-y-auto border mb-4 w-full flex items-center flex-col gap-5 justify-center">
            <div className="w-full mx-auto p-2">
                <div className="mb-4">
                    <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300" />
                </div>

                <div className="customTable w-full rounded-md border overflow-hidden border-gray-200">
                    <table className="w-full border-2 text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left font-medium text-gray-700 cursor-pointer" >
                                    No.
                                </th>
                                <th className="p-3 text-left font-medium text-gray-700 cursor-pointer" >
                                    Product Name
                                </th>
                                <th className="p-3 text-left font-medium text-gray-700 cursor-pointer" >
                                    Category
                                </th>
                                <th className="p-3 text-left font-medium text-gray-700 cursor-pointer" >
                                    Price
                                </th>
                                <th className="p-3 text-left font-medium text-gray-700">
                                    Stock
                                </th>
                                <th className="p-0 text-left font-medium text-gray-700"> 

                                </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                sortedData.map((item, index) => (
                                    <tr key={item.id || index} className={`border-t border-gray-200 hover:bg-blue-200/50 ${index % 2 === 0 ? "bg-white" : "bg-blue-100/50"}`} >
                                        <td className="p-3">
                                            {index + 1}
                                        </td>

                                        {
                                            columns.map((key) => (
                                                <td key={key} className="p-3">
                                                    {item[key]}
                                                </td>
                                            ))
                                        }

                                        <td className="p-0 relative">
                                            <BsThreeDotsVertical onClick={() => toggleActionMenu(item.id || index)} className="action-btn text-gray-600 cursor-pointer" />

                                            <div className={`${ openActionMenuId === ( item.id || index)? "opacity-100 scale-[1] z-30" : "opacity-0 scale-[0.8] z-[-1]" } ${index > 1 ? "bottom-[90%]" : "top-[90%]"} zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`} >
                                                <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                    <MdOutlineEdit/>
                                                    Edit
                                                </p>
                                                <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                    <MdDeleteOutline/>
                                                    Delete
                                                </p>
                                                <p onClick={() => handalViewDetails(item._id)} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                    <IoEyeOutline/>
                                                    View Details
                                                </p>
                                            </div>
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!sortedData?.length && (
                        <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
                            No data found!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsTable;
          // import {useEffect, useMemo, useState} from "react";
// import {HiOutlineArrowsUpDown} from "react-icons/hi2";
// import {BsThreeDotsVertical} from "react-icons/bs";
// import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
// import {IoEyeOutline} from "react-icons/io5";
// import Loader from "../loader/Loader";

// const ProductsTable = ({ products }) => {
//     const initialData = [
//         {
//             id: 1,
//             name: "John Doe",
//             email: "john@example.com",
//             role: "Admin",
//             status: "Active",
//         },
//         {
//             id: 2,
//             name: "Jane Smith",
//             email: "jane@example.com",
//             role: "User",
//             status: "Inactive",
//         },
//         {
//             id: 3,
//             name: "Bob Johnson",
//             email: "bob@example.com",
//             role: "Editor",
//             status: "Active",
//         },
//         {
//             id: 4,
//             name: "Alice Brown",
//             email: "alice@example.com",
//             role: "User",
//             status: "Active",
//         },
//         {
//             id: 5,
//             name: "Charlie Wilson",
//             email: "charlie@example.com",
//             role: "Admin",
//             status: "Inactive",
//         },
//     ];

//     const [data, setData] = useState(initialData);
//     const [search, setSearch] = useState("");
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//     const [openActionMenuId, setOpenActionMenuId] = useState(null);

//     const toggleActionMenu = (id) => {
//         setOpenActionMenuId(openActionMenuId === id ? null : id);
//     };

//     // Handle search
//     const filteredData = useMemo(() => {
//         return data.filter((item) =>
//             Object.values(item).some((value) =>
//                 value.toString().toLowerCase().includes(search.toLowerCase())
//             )
//         );
//     }, [data, search]);

//     // Handle sort
//     const handleSort = (key) => {
//         let direction = "asc";
//         if (sortConfig.key === key && sortConfig.direction === "asc") {
//             direction = "desc";
//         }
//         setSortConfig({ key, direction });
//     };

//     const sortedData = useMemo(() => {
//         if (!sortConfig.key) return filteredData;

//         return [...filteredData].sort((a, b) => {
//             if (a[sortConfig.key] < b[sortConfig.key]) {
//                 return sortConfig.direction === "asc" ? -1 : 1;
//             }
//             if (a[sortConfig.key] > b[sortConfig.key]) {
//                 return sortConfig.direction === "asc" ? 1 : -1;
//             }
//             return 0;
//         });
//     }, [filteredData, sortConfig]);

//     useEffect(() => {
//         const handleCLick = (event) => {
//             if (
//                 !event.target.closest(".zenui-table") &&
//                 !event.target.closest(".action-btn")
//             ) {
//                 setOpenActionMenuId(null);
//             }
//         };
//         document.addEventListener("click", handleCLick);
//         return () => document.removeEventListener("click", handleCLick);
//     }, [])


//     useEffect(() => {
//         const handleCLick = (event) => {
//             if (
//                 !event.target.closest(".zenui-table") &&
//                 !event.target.closest(".action-btn")
//             ) {
//                 setOpenActionMenuId(null);
//             }
//         };
//         document.addEventListener("click", handleCLick);
//         return () => document.removeEventListener("click", handleCLick);
//     }, [])

//     return (
//         <div className="customTable overflow-y-auto p-8 mb-4 w-full flex items-center flex-col gap-5 justify-center">
//             <div className="w-full mx-auto p-4">
//                 <div className="mb-4">
//                     <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300" />
//                 </div>

//                 <div className="customTable w-full rounded-md border overflow-hidden border-gray-200">
//                     <table className="w-full text-sm">
//                         <thead className="bg-gray-100">
//                         <tr>
//                             {
//                                 Object?.keys(products[0]).map((key) => key !== "id" && 
//                                     (
//                                         <th key={key} className="p-3 text-left font-medium text-gray-700 cursor-pointer" >
//                                             <div className="flex items-center gap-[5px]">
//                                                 {key.charAt(0).toUpperCase() + key.slice(1)}
//                                                 <HiOutlineArrowsUpDown
//                                                     onClick={() => handleSort(key)}
//                                                     className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]"/>
//                                             </div>
//                                         </th>
//                                     )
//                             )}
//                             <th className="p-3 text-left font-medium text-gray-700">
//                                 Actions
//                             </th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {sortedData.map((item, index) => (
//                             <tr
//                                 key={item.id}
//                                 className="border-t border-gray-200 hover:bg-gray-50"
//                             >
//                                 {Object.entries(item).map(
//                                     ([key, value]) =>
//                                         key !== "id" && (
//                                             <td key={key} className="p-3">
//                                                 {value}
//                                             </td>
//                                         )
//                                 )}
//                                 <td className="p-3 relative">
//                                     <BsThreeDotsVertical
//                                         onClick={() => toggleActionMenu(item.id)}
//                                         className="action-btn text-gray-600 cursor-pointer"
//                                     />

//                                     <div
//                                         className={`${
//                                             openActionMenuId === item.id
//                                                 ? "opacity-100 scale-[1] z-30"
//                                                 : "opacity-0 scale-[0.8] z-[-1]"
//                                         }
//                                          ${index > 1 ? "bottom-[90%]" : "top-[90%]"}
//                                          zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
//                                     >
//                                         <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
//                                             <MdOutlineEdit/>
//                                             Edit
//                                         </p>
//                                         <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
//                                             <MdDeleteOutline/>
//                                             Delete
//                                         </p>
//                                         <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
//                                             <IoEyeOutline/>
//                                             View Details
//                                         </p>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>

//                     {!sortedData?.length && (
//                         <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
//                             No data found!
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductsTable;