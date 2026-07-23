import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { loadingContext } from "../context/LoadingContextProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UploadCategory from "../Components/UploadCategory";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";

const ViewCategories = () => {
  const [data, setData] = useState([]);
  const { showLoader, hideLoader } = useContext(loadingContext);
  const [total, setTotal] = useState(0);
  const [sortType, setSortType] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isUploading, setIsUploading] = useState(false);
  const [searchResponse , setSearchResponse]=useState("")
  const [searchLoading  , setSearchLoading]=useState(false)
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const [search , setSearch]=useState("")

  const totalNumberOfPages = Math.ceil(total / limit);

  const navigate = useNavigate();

  const namedebounce=useDebounce(search , 500)

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
      const url = `${import.meta.env.VITE_CATEGORY_BASE_URL}/Get-All-Categories?page=${page}&limit=${limit}`;
      const response = await axios.get(url);
      setData(response.data.data);
      setTotal(response.data.total);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      hideLoader();
    }
  };
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) {
        return;
      }
      showLoader();
      const url = `${import.meta.env.VITE_CATEGORY_BASE_URL}/Delete-Category/${id}`;
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
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response?.data?.error ||
          error?.response?.data?.message ||
          "An error occurred during category deletion",
      );
      toast.error("Error deleting category", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      hideLoader();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [page]);


  
  const searchData = async () => {
    try {
      setSearchLoading(true);
      let searchUrl = `${import.meta.env.VITE_SEARCH_BASE_URL}/search-category?q=${search}`;
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
  const tableData = searchResponse.length > 0 ? searchResponse : data;
  useEffect(() => {
    if (namedebounce.trim() !== "") {
      searchData();
    } else {
      setSearchResponse([]);
    }
  }, [namedebounce]);

  return (
    <div className="itempage">
      <Navbar />
      <UploadCategory
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        fetchData={fetchData}
      />
      <div className="itempage-content">
        <div className="w-full flex flex-col gap-2 justify-between items-center !p-1">

           <div className="w-full flex justify-between">
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

          <div className="searchbar w-full flex justify-between items-center !p-3">
            <h2 className="text-[#191C1E] text-2xl font-semibold">
              Categories Overview
            </h2>
            <button
              onClick={(e) => setIsUploading(true)}
              className="!p-3 bg-[#004AC6] text-white rounded cursor-pointer font-bold "
            >
              Add New Category
            </button>
          </div>
         
        </div>
        <table className="w-full border border-gray-300 rounded-lg overflow-auto backdrop:blur-md bg-white/30">
          <thead>
            <tr>
              <th>Sr</th>

              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((category, index) => (
              <tr key={category.id}>
                <td className="border border-gray-300 !p-2 text-center">
                  {index + 1}
                </td>

                <td className="border border-gray-300 !p-2 text-center">
                  {category.name}
                </td>
                <td className="border border-gray-300 !p-2 text-center">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white !px-4 !py-2 cursor-pointer  rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={8}>
                <div className="flex justify-between items-center w-full !p-2 !px-4 bg-[#F2F4F6]">
                  <p>
                    Showing {page} - {data.length} of {total}
                  </p>{" "}
                  <div className="gap-2 flex ">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1 || searchResponse.length > 0}
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
                        disabled={searchResponse.length > 0}
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
                      disabled={
                        page === totalNumberOfPages || searchResponse.length > 0
                      }
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
  );
};

export default ViewCategories;
