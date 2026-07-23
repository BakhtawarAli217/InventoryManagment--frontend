import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const UploadBrand = ({ isUploading  , setIsUploading , fetchData}) => {
  const [brandName, setBrandName] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
const [loading , setLoading]=useState(false)
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [categoryLoading , setCategoryLoading]=useState(false)

  const brandRef = useRef(null);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (brandRef.current && !brandRef.current.contains(e.target)) {
        setBrandDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const fetchCategoryData = async () => {
    try {
        setCategoryLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_CATEGORY_BASE_URL}/Get-All-Categories`,
      );

      setCategoryData(response.data.data);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to fetch categories");
    } finally {
        setCategoryLoading(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName.trim() || !selectedCategory) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
        setLoading(true)
      await axios.post(`${import.meta.env.VITE_BRAND_BASE_URL}/Upload-Brand`, {
        name: brandName,
        categoryId: selectedCategory,
      });

      toast.success("Brand added successfully");

      setBrandName("");
      setSelectedCategory(null);
    } catch (e) {
      toast.error(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          "Failed to add brand",
      );
    } finally {
        fetchData()
        setLoading(false)
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
      <section
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
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-white !p-4 rounded-xl shadow !mt-4"
        >
          <div>
            <label className="font-semibold text-[#515F74]">Brand Name</label>

            <input
              type="text"
              placeholder="Enter Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full border border-gray-300 !p-2 outline-none"
            />
          </div>

          <div className="relative" ref={brandRef}>
            <label className="font-semibold text-[#515F74]">
              Select Category
            </label>

            <input
              type="text"
              readOnly
              value={categoryName}
              placeholder="Select Category"
              onFocus={() => setBrandDropdownOpen(true)}
              className="w-full border border-gray-300 !p-2 outline-none cursor-pointer"
            />

            {brandDropdownOpen && (
              <div className="absolute left-0 right-0 !mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-50">
                {categoryData.length > 0 ? (
                  categoryData.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setCategoryName(category.name);
                        setBrandDropdownOpen(false);
                      }}
                      className="!p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {category.name}
                    </div>
                  ))
                ) : categoryLoading ? <div className="p-2 text-gray-500">
                    ...Loading
                  </div> :  (
                  <div className="p-2 text-gray-500">
                    No Categories Available
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            disabled={loading}
            className={`w-full !p-2 rounded text-white flex justify-center items-center gap-2 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 20 20"
                fill="none"
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
                />
              </svg>
            )}

            {loading ? "Adding..." : "Add Brand"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default UploadBrand;
