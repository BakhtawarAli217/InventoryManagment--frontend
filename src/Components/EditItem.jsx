import React , {useState , useEffect  , useRef} from "react";
import {toast} from "react-toastify"
import axios from "axios";

const EditItem = ({ isUpdating, setIsUpdating , id  , fetchData}) => {

    const [selectedBrand, setSelectedBrand] = useState(null);
      const [brandPage, setBrandPage] = useState(1);
      const [brandData, setBrandData] = useState([]);
      const [hasBrandMore, setHasBrandMore] = useState(true);
      const [brandDropDownOpen, setBrandDropDownOpen] = useState(false);
      const [categoryDropDownOpen, setCategoryDropDownOpen] = useState(false);
      const [hasCategoryMore, setHasCategoryMore] = useState(true);
      const [categoryPage, setCategoryPage] = useState(1);
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [selectedModel, setSelectedModel] = useState("");
      const [modelData, setModelData] = useState([]);
      const [modelPage, setModelPage] = useState(1);
      const [modelDropDownOpen, setModelDropDownOpen] = useState(false);
      const [categoryData, setCategoryData] = useState([]);
      const [categoryName, setCategoryName] = useState("");
      const [modelName, setModelName] = useState("");
      const [hasModelMore, setHasModelMore] = useState(true);
      const [brandName, setBrandName] = useState("");
      const [itemName, setItemName] = useState("");
      const [itemPrice, setItemPrice] = useState("");
      const [itemStock, setItemStock] = useState("");
      const [loading, setLoading] = useState(false);
    
      const dropDownRef = useRef();
      const categoryRef = useRef();
      const modelRef = useRef();



      
        const fetchCategoryData = async () => {
          try {
            console.log("categ");
            const url = `${import.meta.env.VITE_Category_BASE_URL}/Get-All-Categories?page=${categoryPage}&limit=10`;
            const response = await axios.get(url);
            console.log(response?.data?.data);
            setCategoryData((prev) => response?.data?.data);
            setCategoryPage((prev) => prev + 1);
            setHasCategoryMore(response?.data?.hasMore);
          } catch (e) {
            console.log(e.response);
            toast.error(
              e?.response?.data?.error ||
                e?.response?.data?.message ||
                "An error occured during fetching categories",
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

        useEffect(() => {
          fetchCategoryData();
        }, []);

        const fetchBrandData = async (categoryId) => {
            try {
              const url = `${import.meta.env.VITE_BRAND_BASE_URL}/Get-brand-By-Category?id=${categoryId}&page=${brandPage}&limit=10`;
              console.log(url);
              const response = await axios.get(url);
              setBrandData((prev) => response?.data?.data);
              
              setHasBrandMore(response?.data?.hasMore);
            } catch (e) {
              console.log(e.response);
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
        
          const fetchModelData = async (brandId) => {
            try {
              const url = `${import.meta.env.VITE_MODEL_BASE_URL}/Get-model-By-Brand?id=${brandId}&page=${modelPage}&limit=10`;
              console.log(url);
              const response = await axios.get(url);
              setModelData((prev) => response?.data?.data);
              
              setHasModelMore(response?.data?.hasMore);
            } catch (e) {
              console.log(e.response);
              toast.error(
                e?.response?.data?.error ||
                  e?.response?.data?.message ||
                  "An error occured during fetching models",
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

          // useEffect(() => {
          //   if (selectedCategory) {
          //     fetchBrandData();
          //   }
          // }, [selectedCategory]);

            // useEffect(() => {
            // if (selectedBrand) {
            //     fetchModelData();
            // }
            // }, [selectedBrand]);

    const fechItemData = async () => {
        
        try {
            const url = `${import.meta.env.VITE_ITEM_BASE_URL}/Get-Item/${id}`;
            const response = await axios.get(url);
            setItemName(response.data.data.name);
            setSelectedCategory(response.data.data.categoryId);
            setSelectedBrand(response.data.data.brandId);
            setSelectedModel(response.data.data.itemModelId);
            setCategoryName(response.data.data.categoryName)
            setBrandName(response.data.data.brandName)
            setModelName(response.data.data.modelName)
            setItemPrice(response.data.data.price);
            setItemStock(response.data.data.stock);
            
        } catch (e) {
            toast.error(
                e?.response?.data?.error ||
                e?.response?.data?.message ||
                "An error occured during fetching item data",
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,

                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {

        if(isUpdating && id){
                        fechItemData();
        }

        
    }, [isUpdating]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(categoryName)
        setLoading(true);
        try{
            const url = `${import.meta.env.VITE_ITEM_BASE_URL}/Update-Item/${id}`;
            const response = await axios.put(url , {
                name: itemName,
                category: selectedCategory,
                brand: selectedBrand,
                model: selectedModel,
                price: itemPrice,
                stock: itemStock,
                categoryName:categoryName,
                brandName:brandName,
                modelName:modelName
            });
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
        }catch(e){
            toast.error(
                e?.response?.data?.error ||
                e?.response?.data?.message ||
                "An error occured during updating item",
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }finally{
            setLoading(false)
            fetchData()
        }
    
    }

  return (
<div
  className={`
    fixed inset-0 bg-black/50 backdrop-blur-sm z-50
    flex items-center justify-center
    transition-all duration-300
    ${isUpdating 
      ? "opacity-100 visible" 
      : "opacity-0 invisible"
    }
  `}
>
  <div
    className={`
      w-full sm:w-[90%] md:w-[600px]
      max-h-[90vh]
      bg-white rounded-2xl shadow-2xl
      overflow-y-auto
      transform transition-all duration-300
      ${isUpdating 
        ? "scale-100 translate-y-0" 
        : "scale-95 translate-y-5"
      }
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
                <h2 className="text-xl font-bold">Update the Item</h2>
                <p className="text-gray-500 cursor-pointer" onClick={() => setIsUpdating(false)}>
                    X
                </p>
            </div>
            <form
  onSubmit={handleSubmit}
  className="
    flex
    flex-col
    items-center
    w-full
    gap-3
    sm:gap-4
    bg-white
    !p-3
    sm:!p-5
    !mt-3
  "
>
          <span className="flex flex-col justify-start w-full ">
            <label htmlFor="name" className="font-semibold text-[#515F74]">
              Item Name
            </label>
            <input
              type="text"
             className=" w-full border-[#C6C6CD] text-[#6B7280] outline-none border rounded !p-2 text-sm sm:text-base"
              placeholder="Enter Item name"
              name="name"
              id="name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </span>

          <span
            className="flex flex-col justify-start w-full relative"
            ref={categoryRef}
          >
            <label htmlFor="category" className="font-semibold text-[#515F74]">
              Item Category
            </label>
            <input
              type="text"
              onFocus={(e) => {
                (setCategoryDropDownOpen(true), setBrandDropDownOpen(false));
              }}
              name="category"
              id="category"
              value={categoryName}
              readOnly
             className=" w-full border-[#C6C6CD] text-[#6B7280] outline-none border rounded !p-2 text-sm sm:text-base"
              placeholder="Select Category"
            />
            {categoryDropDownOpen && (
              <div className="absolute z-20 w-full bg-white shadow-xl border border-gray-300 rounded-md bottom-0 translate-y-full gap-2">
                <ul className=" w-full max-h-48 overflow-y-auto !p-2 ">
                  {categoryData.length > 0 ? (
                    categoryData.map((item, index) => (
                      <li
                        key={index}
                        className="  w-full  !p-2  cursor-pointer  hover:bg-gray-100  rounded-md  text-[#515F74]"
                        onClick={() => {
                            setSelectedCategory(item.id);
                          setCategoryName(item.name);
                          setCategoryPage(1);
                          setCategoryDropDownOpen(false);

                          setSelectedBrand(null);
                          setSelectedModel(null);

                          setBrandName("");
                          setModelName("");

                          setBrandData([]);
                          setModelData([]);

                          setBrandPage(1);
                          setModelPage(1);

                          setSelectedCategory(item.id);
                          setCategoryName(item.name);

                          setCategoryDropDownOpen(false);

                          // Fetch brands immediately
                          fetchBrandData(item.id);
                        }}
                      >
                        {item.name}
                      </li>
                    ))
                  ) : (
                    <li className="p-2">No Category Available</li>
                  )}

                  {hasCategoryMore && (
                    <button
                      type="button"
                      onClick={fetchCategoryData}
                      className="
              w-full
              mt-2
              p-2
              bg-blue-500
              text-white
              rounded-md
              hover:bg-blue-600
            "
                    >
                      Next Page
                    </button>
                  )}
                </ul>
              </div>
            )}
          </span>

          <span
            className="flex flex-col justify-start w-full relative "
            ref={dropDownRef}
          >
            <label htmlFor="brand" className="font-semibold text-[#515F74]">
              Item Brand
            </label>
            <input
              type="text"
              onFocus={(e) => setBrandDropDownOpen(true)}
              value={brandName}
              name="brand"
              id="brand"
              className=" w-full border-[#C6C6CD] text-[#6B7280] outline-none border rounded !p-2 text-sm sm:text-base"
              placeholder="Select Brand"
            />
            {brandDropDownOpen && (
              <div className="absolute z-20 w-full bg-white shadow-xl border border-gray-300 rounded-md bottom-0 translate-y-full gap-2">
                <ul className=" w-full max-h-48 overflow-y-auto !p-2 ">
                  {brandData.length > 0 ? (
                    brandData.map((item, index) => (
                      <li
                        key={index}
                        className="  w-full  !p-2  cursor-pointer  hover:bg-gray-100  rounded-md  text-[#515F74]"
                        onClick={() => {
                        setSelectedBrand(item.id);
                          setBrandName(item.name);
                          setBrandDropDownOpen(false);
                          setSelectedBrand(item.id);
                          setBrandName(item.name);

                          setSelectedModel(null);
                          setModelName("");
                          setModelData([]);
                          setModelPage(1);

                          setBrandDropDownOpen(false);

                          fetchModelData(item.id);
                        }}
                      >
                        {item.name}
                      </li>
                    ))
                  ) : (
                    <li className="p-2">No Brand Available</li>
                  )}

                  {hasBrandMore && (
                    <button
                      type="button"
                      onClick={fetchBrandData}
                      className=" w-full  mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
                    >
                      Next Page
                    </button>
                  )}
                </ul>
              </div>
            )}
          </span>
          <span
            className="flex flex-col justify-start w-full relative"
            ref={modelRef}
          >
            <label htmlFor="model" className="font-semibold text-[#515F74]">
              Item Model
            </label>
            <input
              type="text"
              onFocus={(e) => {
                (setModelDropDownOpen(true), setBrandDropDownOpen(false));
              }}
              name="model"
              id="model"
              value={modelName}
              readOnly
              className=" w-full border-[#C6C6CD] text-[#6B7280] outline-none border rounded !p-2 text-sm sm:text-base"
              placeholder="Select Model"
            />
            {modelDropDownOpen && (
              <div className="absolute z-20 w-full bg-white shadow-xl border border-gray-300 rounded-md bottom-0 translate-y-full gap-2">
                <ul className=" w-full max-h-48 overflow-y-auto !p-2 ">
                  {modelData.length > 0 ? (
                    modelData.map((item, index) => (
                      <li
                        key={index}
                        className="  w-full  !p-2  cursor-pointer  hover:bg-gray-100  rounded-md  text-[#515F74]"
                        onClick={() => {
                          setSelectedModel(item.id);
                          setModelName(item.name);
                          setModelDropDownOpen(false);
                        }}
                      >
                        {item.name}
                      </li>
                    ))
                  ) : (
                    <li className="p-2">No Model Available</li>
                  )}

                  {hasModelMore && (
                    <button
                      type="button"
                      onClick={fetchModelData}
                      className="
              w-full
              mt-2
              p-2
              bg-blue-500
              text-white
              rounded-md
              hover:bg-blue-600
            "
                    >
                      Next Page
                    </button>
                  )}
                </ul>
              </div>
            )}
          </span>
          <span className="flex flex-col justify-start w-full ">
            <label htmlFor="price" className="font-semibold  text-[#515F74]">
              Item Price
            </label>
            <input
              type="text"
              className=" w-full border-[#C6C6CD] text-[#6B7280] outline-none border rounded !p-2 text-sm sm:text-base"
              placeholder="Enter Item Price"
              name="price"
              id="price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </span>
          <span className="flex flex-col justify-start w-full ">
            <label htmlFor="stock" className="font-semibold  text-[#515F74]">
              Item Stock
            </label>
            <input
              type="text"
             className=" w-full border-[#C6C6CD] text-[#6B7280] outline-none border rounded !p-2 text-sm sm:text-base"
              placeholder="Enter Item STock"
              name="stock"
              id="stock"
              value={itemStock}
              onChange={(e) => setItemStock(e.target.value)}
            />
          </span>
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

export default EditItem;