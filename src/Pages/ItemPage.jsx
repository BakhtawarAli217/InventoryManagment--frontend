import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Edititem from "../Components/EditItem";
import { toast } from "react-toastify";
import { loadingContext } from "../context/LoadingContextProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounce } from "../hooks/useDebounce";
import UploadItem from "../Components/UploadItem";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

const ItemPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(500);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [sortType, setSortType] = useState("");
  const { showLoader, hideLoader } = useContext(loadingContext);
  const [hasMore, setHasMore] = useState(false);
  const [searchType, setSearchType] = useState("name");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const searchDebounce = useDebounce(search, 500);
  const minPriceDebounce = useDebounce(minPrice, 500);
  const maxPriceDebounce = useDebounce(maxPrice, 500);
  const totalNumberOfPages = Math.ceil(total / limit);

  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  const navigate = useNavigate();
  const pagesPerGroup = 3;

  const getVisiblePages = () => {
    const startPage =
      Math.floor((page - 1) / pagesPerGroup) * pagesPerGroup + 1;

    const pages = [];

    for (
      let i = startPage;
      i <= Math.min(startPage + pagesPerGroup - 1, totalNumberOfPages);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  const handleNextPage = () => {
    if (page < totalNumberOfPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    setCurrentPageGroup(0);
  }, [totalNumberOfPages]);

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

  const handleDelete = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (!confirmed.isConfirmed) return;
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

  const filteredData = data.filter((item) => {
    if (searchType === "name") {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }

    if (searchType === "price") {
      const price = Number(item.price);

      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;

      return price >= min && price <= max;
    }

    return true;
  });

  const sortedData = [...data].sort((a, b) => {
    if (sortType === "phtl") {
      return b.price - a.price;
    }

    if (sortType === "plth") {
      return a.price - b.price;
    }

    if (sortType === "byn") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  const searchData = async () => {
    try {
      setSearchLoading(true);
      let searchUrl = "";
      if (searchType === "name") {
        searchUrl = `${import.meta.env.VITE_SEARCH_BASE_URL}/search-items?name=${search}`;
      } else if (searchType === "price") {
        searchUrl = `${import.meta.env.VITE_SEARCH_BASE_URL}/search-items?minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }
      const response = await axios.get(searchUrl);
      setSearchResponse(response.data.data);
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          e?.response?.data?.message ||
          "Error while search the item",
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
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (searchType === "name") {
      if (searchDebounce) {
        searchData();
      }
    }
  }, [searchType, searchDebounce]);

  useEffect(() => {
    if (searchType === "price") {
      if (minPriceDebounce || maxPriceDebounce) {
        searchData();
      }
    }
  }, [searchType, minPriceDebounce, maxPriceDebounce]);

  useEffect(() => {
    if (searchType === "name" && searchDebounce.trim() === "") {
      setSearchResponse([]);
    }

    if (
      searchType === "price" &&
      minPriceDebounce === "" &&
      maxPriceDebounce === ""
    ) {
      setSearchResponse([]);
    }
  }, [searchDebounce, minPriceDebounce, maxPriceDebounce, searchType]);

  const tableData = searchResponse.length > 0 ? searchResponse : sortedData;

  const exportCSV = () => {
    if (!tableData || tableData.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const headers = [
      "Sr",
      "Item Name",
      "Item Category",
      "Brand",
      "Model",
      "Price",
      "Stock Level",
    ];

    const rows = tableData.map((item, index) => [
      index + 1,
      item.name,
      item.categoryName,
      item.brandName,
      item.modelName,
      item.price,
      item.stock,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="itempage relative min-h-screen">
      <Navbar />

      <Edititem
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        id={selectedItemId}
        fetchData={fetchData}
      />
      <UploadItem
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        fetchData={fetchData}
      />
      <div className="itempage-content w-full !p-3 sm:!p-5">
        {/* Sort Section */}

        <div className="w-full flex flex-col gap-2 justify-between items-center !p-1">
          <div className="searchbar w-full flex justify-between items-center">
            <div className="w-[70%] flex gap-2">
              <select
                className="bg-[#F2F4F6] border border-[#C3C6D7] rounded !p-2"
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value);
                  setSearch("");
                  setMinPrice("");
                  setMaxPrice("");
                }}
              >
                <option value="name">Search By Name</option>
                <option value="price">Price Range</option>
              </select>

              {searchType === "name" && (
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search Items"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded outline-none !p-2 bg-[#F2F4F6] border border-[#C3C6D7] pr-8"
                  />

                  <p
                    className="absolute right-3 top-1/2 -translate-y-4 text-xl cursor-pointer"
                    onClick={() => setSearch("")}
                  >
                    x
                  </p>
                </div>
              )}

              {searchType === "price" && (
                <>
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-[30%] rounded outline-none !p-2 bg-[#F2F4F6] border border-[#C3C6D7]"
                  />

                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-[30%] rounded outline-none !p-2 bg-[#F2F4F6] border border-[#C3C6D7]"
                  />
                </>
              )}
              {searchLoading && (
                <div className="search-loader flex items-center justify-center w-8 h-8">
                  <svg
                    className="w-6 h-6 animate-spin"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="spinnerGradient">
                        <stop
                          offset="0%"
                          stopColor="hsl(228, 97%, 42%)"
                          stopOpacity="1"
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(228, 97%, 42%)"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="url(#spinnerGradient)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={exportCSV}
                className="!p-3 bg-green-600 text-white rounded cursor-pointer font-bold"
              >
                Export CSV
              </button>

              <button
                onClick={() => setIsUploading(true)}
                className="!p-3 bg-[#004AC6] text-white rounded cursor-pointer font-bold"
              >
                Add New Inventory
              </button>
            </div>
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
              <option value="byn">Sort By Name</option>
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
              {tableData.map((item, index) => (
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

              <tr>
                <td colSpan={8}>
                  <div className="flex justify-between items-center w-full !p-2 !px-4 bg-[#F2F4F6]">
                    <p>
                      Showing {page} - {data.length} of {total}
                    </p>{" "}
                    <div className="gap-2 flex">
                      <button
                        onClick={handlePrevPage}
                        disabled={(page === 1 || searchResponse.length>0)}
                        className={`!p-1 !px-2 border-none outline-none cursor-pointer bg-[#004AC6] text-white ${
                          page === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "bg-[#004AC6] text-white"
                        }`}
                      >
                        <p className="text-xl ">
                          <FaAngleLeft />
                        </p>
                      </button>

                      {/* Page Numbers */}
                      {getVisiblePages().map((pageNum) => (
                        <button
                          key={pageNum}
                          disabled={searchResponse.length>0}
                          onClick={() => {
                            setPage(pageNum);
                            setCurrentPageGroup(
                              Math.floor((pageNum - 1) / pagesPerGroup),
                            );
                          }}
                          className={`!p-2  rounded cursor-pointer ${page === pageNum ? "bg-blue-700 text-white" : "bg-blue-50"}`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      {/* Next Arrow */}
                      <button
                        onClick={handleNextPage}
                        disabled={(page === totalNumberOfPages || searchResponse.length>0)}
                        className={`!p-1 !px-2 border-none outline-none cursor-pointer bg-[#004AC6] text-white ${
                          currentPageGroup >=
                          Math.floor((totalNumberOfPages - 1) / 3)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <p className="text-xl">
                          <FaAngleRight />
                        </p>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
