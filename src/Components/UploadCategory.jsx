import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { loadingContext } from "../context/LoadingContextProvider";

const UploadCategory = ({ isUploading, setIsUploading, fetchData }) => {
  const { showLoader, hideLoader } = useContext(loadingContext);
  const [categoryName, setCategoryName] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_CATEGORY_BASE_URL}/Upload`;
      const response = await axios.post(url, { name: categoryName });
      const data = response.data.data;
      hideLoader();
      toast.success("Category added successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCategoryName("");
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "An error occurred during category addition",
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
      setLoading(false);
    }
  };

  return (
    <div
      className={`
    fixed inset-0 bg-black/50 backdrop-blur-sm z-50
    flex items-center justify-center
    transition-all duration-300
    ${isUploading ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
    >
      <div
        className={`
      w-full sm:w-[90%] md:w-[600px]
      max-h-[90vh]
      bg-white rounded-2xl shadow-2xl
      overflow-y-auto
      transform transition-all duration-300
      ${isUploading ? "scale-100 translate-y-0" : "scale-95 translate-y-5"}
    `}
      >
        <div
          className="
    w-full
    flex
    justify-between
    items-center
    !p-3
    sm:!p-4
    border-b
    border-gray-300
  "
        >
          <h2 className="text-xl font-bold">Add New Item</h2>
          <p
            className="text-gray-500 cursor-pointer"
            onClick={() => setIsUploading(false)}
          >
            X
          </p>
        </div>
        <form
          className="w-full !mt-1 flex flex-col gap-2 !p-3"
          onSubmit={handleSubmit}
        >
          <label htmlFor="categoryName" className="block  font-semibold">
            Category Name:
          </label>
          <input
            type="text"
            placeholder="Enter Category Name"
            className=" w-full border-[#C6C6CD] text-[#6B7280] outline-none border !p-2"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full !p-2 bg-black text-white rounded text-xl cursor-pointer flex justify-center items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="loaderGradient">
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      stopOpacity="1"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0.25"
                    />
                  </linearGradient>
                </defs>

                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="url(#loaderGradient)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}

            {loading ? "Adding..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCategory;
