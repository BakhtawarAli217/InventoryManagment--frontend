import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Edititem from "../Components/EditItem";
import { toast } from "react-toastify";
import { loadingContext } from "../context/LoadingContextProvider";
import { useNavigate } from "react-router-dom";

const ItemPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [sortType, setSortType] = useState("");
  const { showLoader, hideLoader } = useContext(loadingContext);
  const [hasMore, setHasMore] = useState(false);


  const navigate=useNavigate()

  const fetchData = async () => {
    try {
      showLoader();
      const url = `${import.meta.env.VITE_ITEM_BASE_URL}/Get-All-Items?page=${page}&limit=${limit}`;
      const response = await axios.get(url);
      setData(response.data.data);
      setHasMore(response.data.hasMore);
      setTotal(response.data.total);
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          e?.response?.data?.message ||
          "An error occured during adding item",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        },
      );
    } finally {
      hideLoader();
    }
  };

  const totalNumberOfPages = Math.ceil(total / limit);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?",
      );
      if (!confirmed) return;
      const url = `${import.meta.env.VITE_ITEM_BASE_URL}/Delete-Item/${id}`;
      showLoader();
      const response = await axios.delete(url);
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      fetchData();
    } catch (e) {
      console.log(
        e?.response?.data?.error ||
          e?.response?.data?.message ||
          "An error occured during deleting item",
      );
      toast.error(
        e?.response?.data?.error ||
          e?.response?.data?.message ||
          "An error occured during deleting item",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        },
      );
    } finally {
      hideLoader();
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortType === "phtl") {
      return b.price - a.price;
    } else if (sortType === "plth") {
      return a.price - b.price;
    } else {
      return data;
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    fetchData()
  },[page])

  return (
    <div className="itempage relative min-h-screen">
      <Navbar />

      <Edititem
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        id={selectedItemId}
      />

      <div className="itempage-content w-full !p-3 sm:!p-5">
        {/* Sort Section */}
        <div className="w-full flex flex-col gap-2 justify-between items-center !p-1">
          <div className="searchbar w-full flex justify-between items-center">
            <input
              type="text"
              placeholder="Search Items"
              className="w-[50%] rounded outline-none !p-2 bg-[#F2F4F6] border border-[#C3C6D7]"
            />
            <button onClick={(e)=>navigate("/Add-inventory")} className="!p-3 bg-[#004AC6] text-white rounded cursor-pointer font-bold ">
              Add New Inventory
            </button>
          </div>
          <div className="w-full flex justify-between items-center !p-2">
            <h2 className="text-[#191C1E] text-2xl font-semibold">
              Inventory Overview
            </h2>
            <select
              name="sort"
              className="bg-[#FFFFFF] text-md !p-2 outline-none border border-[#C3C6D7] cursor-pointer "
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="phtl">Price High to Low</option>
              <option value="plth">Price Low To High</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto rounded-lg">
          <table
            className="
            w-full 
            min-w-[900px]
            border 
            border-gray-300 
            backdrop:blur-md 
            bg-white/30
          "
          >
            <thead>
              <tr>
                <th className="!p-2">Sr</th>
                <th className="!p-2">Item Name</th>
                <th className="!p-2">Item Category</th>
                <th className="!p-2">Brand</th>
                <th className="!p-2">Model</th>
                <th className="!p-2">Price</th>
                <th className="!p-2">Stock Level</th>
                <th className="!p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 !p-2 text-center">
                    {index + 1}
                  </td>

                  <td className="border border-gray-300 !p-2 text-center">
                    {item.name}
                  </td>

                  <td className="border border-gray-300 !p-2 text-center">
                    {item?.categoryName}
                  </td>

                  <td className="border border-gray-300 !p-2 text-center">
                    {item?.brandName}
                  </td>

                  <td className="border border-gray-300 !p-2 text-center">
                    {item?.modelName}
                  </td>

                  <td className="border border-gray-300 !p-2 text-center">
                    {item.price}
                  </td>

                  <td className="border border-gray-300 !p-2 text-center">
                    {item.stock}
                  </td>

                  <td
                    className="
                    border 
                    border-gray-300 
                    !p-2 
                    text-center
                  "
                  >
                    <div
                      className="
                    flex 
                    flex-col 
                    sm:flex-row 
                    gap-2 
                    justify-center 
                    items-center
                  "
                    >
                      <button
                        className="
                        w-full
                        sm:w-auto
                        !px-5
                        !py-2
                        bg-green-400
                        text-white
                        hover:bg-green-600
                        cursor-pointer
                        rounded-xl
                      "
                        onClick={() => {
                          setIsUpdating(true);
                          setSelectedItemId(item.id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="
                        w-full
                        sm:w-auto
                        !px-5
                        !py-2
                        bg-red-500
                        text-white
                        hover:bg-red-700
                        cursor-pointer
                        rounded-xl
                      "
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {hasMore && (
                <tr>
                  <td colSpan={8}>
                    <div className="flex justify-between items-center w-full !p-2 !px-4 bg-[#F2F4F6]">
                      <p> 
                        Showing 1 - {data.length} of {total}
                      </p>{" "}
                      <div className="">
                        {Array.from(
                          { length: totalNumberOfPages },
                          (_, index) => (
                            <button onClick={(e)=>setPage(index+1)} className="!p-1 !px-2 border-none outline-none text-white cursor-pointer aspect-square bg-[#004AC6]">{index + 1}</button>
                          ),
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
