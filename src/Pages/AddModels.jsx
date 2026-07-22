import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { loadingContext } from "../context/LoadingContextProvider";

const AddModels = () => {
  const {showLoader , hideLoader , loading}=useContext(loadingContext)

  const [modelName, setModelName] = useState("");

  const [brandData, setBrandData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandName, setBrandName] = useState("");

  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);

  const brandRef = useRef(null);

  useEffect(() => {
    fetchBrandData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (brandRef.current && !brandRef.current.contains(e.target)) {
        setBrandDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () =>
      window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const fetchBrandData = async () => {
    try {
      showLoader()
      const response = await axios.get(
        `${import.meta.env.VITE_BRAND_BASE_URL}/Get-All-Brands`
      );

      setBrandData(response.data.data);
    } catch (e) {
      toast.error(
        e?.response?.data?.message || "Failed to fetch brands"
      );
    }finally{
      hideLoader()
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!modelName.trim() || !selectedBrand) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      showLoader()

      await axios.post(
        `${import.meta.env.VITE_MODEL_BASE_URL}/Create-Model`,
        {
          name: modelName,
          brandId: selectedBrand,
        }
      );

      toast.success("Model added successfully");

      setModelName("");
      setSelectedBrand(null);
      setBrandName("");
    } catch (e) {
      toast.error(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          "Failed to add model"
      );
    } finally {
      hideLoader()
    }
  };

  return (
    <div className="Additem-Page">
      <Navbar />

      <section className="itempage-content flex flex-col items-start !p-3">
        <h2 className="text-2xl font-bold">Add Model</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-white !p-4 rounded-xl shadow !mt-4"
        >
          <div>
            <label className="font-semibold text-[#515F74]">
              Model Name
            </label>

            <input
              type="text"
              placeholder="Enter Model Name"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full border border-gray-300 !p-2 outline-none"
            />
          </div>

          <div
            className="relative"
            ref={brandRef}
          >
            <label className="font-semibold text-[#515F74]">
              Select Brand
            </label>

            <input
              type="text"
              readOnly
              value={brandName}
              placeholder="Select Brand"
              onFocus={() => setBrandDropdownOpen(true)}
              className="w-full border border-gray-300 !p-2 outline-none cursor-pointer"
            />

            {brandDropdownOpen && (
              <div className="absolute left-0 right-0 !mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-50">
                {brandData.length > 0 ? (
                  brandData.map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => {
                        setSelectedBrand(brand.id);
                        setBrandName(brand.name);
                        setBrandDropdownOpen(false);
                      }}
                      className="!p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {brand.name}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">
                    No Brands Available
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

            {loading ? "Adding..." : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddModels;