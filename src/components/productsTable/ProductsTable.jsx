import { useEffect, useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useToRoute } from "../../hooks/navigation/useToRoute";

const ProductsTable = ({ products }) => {
    const columns = ["productName", "category", "price", "stockStatus"];
    const goTo = useToRoute();

    const [search, setSearch] = useState("");
    const [openActionMenuId, setOpenActionMenuId] = useState(null);
    const [priceSort, setPriceSort] = useState("default");

    // Always use products from props, no need for local data state
    const toggleActionMenu = (id) => {
        setOpenActionMenuId(openActionMenuId === id ? null : id);
    };

    const handalViewDetails = (id) => {
        goTo(`/product/${id}`);
    };

    // Sort by price if selected
    const priceSortedData = useMemo(() => {
        if (priceSort === "default") return products;
        return [...products].sort((a, b) => {
            const priceA = Number(a.price) || 0;
            const priceB = Number(b.price) || 0;
            if (priceSort === "low") return priceA - priceB;
            if (priceSort === "high") return priceB - priceA;
            return 0;
        });
    }, [products, priceSort]);

    // Handle search
    const filteredData = useMemo(() => {
        return priceSortedData.filter((item) =>
            columns.some((key) =>
                (item[key] || "").toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [priceSortedData, search]);

    useEffect(() => {
        const handleClick = (event) => {
            if (
                !event.target.closest(".zenui-table") &&
                !event.target.closest(".action-btn")
            ) {
                setOpenActionMenuId(null);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="customTable overflow-y-auto mb-4 w-full flex items-center flex-col gap-5 justify-center">
            <div className="w-full mx-auto p-2">
                <div className="mb-4 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
                    />
                    <select
                        value={priceSort}
                        onChange={e => setPriceSort(e.target.value)}
                        className="border border-gray-200 rounded-md px-3 py-2"
                    >
                        <option value="default">Sort by Price</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>

                <div className="customTable w-full rounded-md border overflow-hidden border-gray-200">
                    <table className="w-full border-2 text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left font-medium text-gray-700">No.</th>
                                <th className="p-3 text-left font-medium text-gray-700">Product Name</th>
                                <th className="p-3 text-left font-medium text-gray-700">Category</th>
                                <th className="p-3 text-left font-medium text-gray-700">$Price</th>
                                <th className="p-3 text-left font-medium text-gray-700">Stock</th>
                                <th className="p-0 text-left font-medium text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={item.id || item._id || index} className={`border-t border-gray-200 hover:bg-blue-200/50 ${index % 2 === 0 ? "bg-white" : "bg-blue-100/50"}`}>
                                    <td className="p-3">{index + 1}</td>
                                    {columns.map((key) => (
                                        <td key={key} className="p-3">
                                            {item[key]}
                                        </td>
                                    ))}
                                    <td className="p-0 relative">
                                        <BsThreeDotsVertical onClick={() => toggleActionMenu(item.id || item._id || index)} className="action-btn text-gray-600 cursor-pointer" />
                                        <div className={`${openActionMenuId === (item.id || item._id || index) ? "opacity-100 scale-[1] z-30" : "opacity-0 scale-[0.8] z-[-1]"} ${index > 1 ? "bottom-[90%]" : "top-[90%]"} zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}>
                                            <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                <MdOutlineEdit />
                                                Edit
                                            </p>
                                            <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                <MdDeleteOutline />
                                                Delete
                                            </p>
                                            <p onClick={() => handalViewDetails(item._id)} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                <IoEyeOutline />
                                                View Details
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!filteredData.length && (
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