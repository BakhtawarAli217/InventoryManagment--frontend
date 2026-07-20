import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import axios from "axios"

const Additem = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandPage, setBrandPage] = useState(1);
  const [brandData, setBrandData] = useState([]);
  const [hasBrandMore, setHasBrandMore] = useState(true);
  const [brandDropDownOpen, setBrandDropDownOpen] = useState(false);

  const dropDownRef = useRef();

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setBrandDropDownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  const fetchBrandData = async () => {
    try {
        const url=`${import.meta.env.VITE_BRAND_BASE_URL}/Get-All-Brands?page=${brandPage}&limit=10`
        const response=await axios.get(url)
        setBrandData((prev)=>response?.data?.data)
        setBrandPage((prev)=>prev+1)
    } catch (e) {
        console.log(e.response)
      toast.error(
        e?.response?.data?.error ||
          e?.response?.data?.message ||
          "An error occured during fetching brands",
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
    }
  };

  

  return (
    <div className="Additem-Page">
      <Navbar />
      <section className="itempage-content flex flex-col items-center p-3">
        <h2 className="text-2xl font-bold">Add Inventory</h2>
        <form className="flex flex-col items-center w-full gap-4">
          <span className="flex flex-col justify-start w-full ">
            <label htmlFor="name" className="font-semibold">
              Item Name
            </label>
            <input
              type="text"
              className=" w-full border-[#57657B] border !p-2"
              placeholder="Enter Item name"
              name="name"
              id="name"
            />
          </span>
          <span
            className="flex flex-col justify-start w-full "
            ref={dropDownRef}
          >
            <label htmlFor="brand" className="font-semibold">
              Item Brand
            </label>
            <input
              type="text"
              onFocus={(e) => setBrandDropDownOpen(true)}
              value={selectedBrand}
              className=" w-full border-[#57657B] border !p-2"
              placeholder="Select Brand"
            />
            {brandDropDownOpen && (
              <div className="brandDropdown z-10 w-full h-50 shadow-xl border-gray-400 flex flex-col items-start justify-evenly gap-2">
                <ul className="w-full h-40 flex flex-col items-start justify-evenly list-none !p-3">
                  {brandData ? 
                  <InfiniteScroll
                  dataLength={brandData.length}
                  hasMore={hasBrandMore}
                  loader={<p>...Loading</p>}
                  >

                  </InfiniteScroll> : <p>No brand Available</p>}
                </ul>
              </div>
            )}
          </span>
        </form>
      </section>
    </div>
  );
};

export default Additem;
