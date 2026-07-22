import React, { useState ,useEffect, useContext } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { loadingContext } from '../context/LoadingContextProvider'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

const ViewModels = () => {
    const [data , setData]=useState([])
    const {showLoader , hideLoader , loading}=useContext(loadingContext)
    const [page , setPage]=useState(1)
    const [limit , setLimit]=useState(10)
    const [total , setTotal]=useState(0)
    const [hasMore , setHasMore]=useState(false)


    const totalNumberOfPages=Math.ceil(total/limit)


    const fetchData=async ()=>{
        try {
            showLoader()
            const url=`${import.meta.env.VITE_MODEL_BASE_URL}/Get-All-Models?page=${page}&limit=${limit}`;
            const response = await axios.get(url);
            setData(response.data.data);
            setHasMore(response.data.hasMore)
            setTotal(response.data.total)
        } catch (error) {
            console.error("Error fetching models:", error);
            toast.error("Error fetching models" , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }finally{
            hideLoader()
        }
    }
    const handleDelete=async (id)=>{
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
              console.log("Delete cancelled");
            return;
        }
            const url=`${import.meta.env.VITE_MODEL_BASE_URL}/Delete-Model/${id}`;
            const response = await axios.delete(url);
            toast.success(response.data.message , {
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
            console.error("Error deleting model:", error.response?.data?.error || error?.response?.data?.message || "An error occurred during model deletion");
            toast.error("Error deleting model" , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const navigate=useNavigate()

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(()=>{
        fetchData()
    },[page])

  return (
    <div className='itempage'>
      <Navbar/>
      <div className="itempage-content">
          <div className="w-full flex flex-col gap-2 justify-between items-center !p-1">
          <div className="searchbar w-full flex justify-between items-center !p-3">
            <h2 className="text-[#191C1E] text-2xl font-semibold">
              Models Overview
            </h2>
            <button
              onClick={(e) => navigate("/Add-Models")}
              className="!p-3 bg-[#004AC6] text-white rounded cursor-pointer font-bold "
            >
              Add New Model
            </button>
          </div>
          {/* <div className="w-full flex justify-between items-center !p-2">
            
            <select
              name="sort"
              className="bg-[#FFFFFF] text-md !p-2 outline-none border border-[#C3C6D7] cursor-pointer "
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="phtl">Price High to Low</option>
              <option value="plth">Price Low To High</option>
            </select>
          </div> */}
        </div>
        <table  className="w-full border border-gray-300 rounded-lg overflow-auto backdrop:blur-md bg-white/30">
            <thead>
                <tr>
                    <th>Sr</th>
              
                    <th>Model Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((model, index) => (
                    <tr key={model.id}>
                        <td  className="border border-gray-300 !p-2 text-center">{index + 1}</td>
                      
                        <td className="border border-gray-300 !p-2 text-center">{model.name}</td>
                        <td className="border border-gray-300 !p-2 text-center">
                            <button onClick={()=>handleDelete(model.id)} className="bg-red-500 text-white !px-2 !py-1 cursor-pointer w-full rounded hover:bg-red-600">
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
                    {Array.from({ length: totalNumberOfPages }, (_, index) => (
                      <button
                        onClick={(e) => setPage(index + 1)}
                        className="!p-1 !px-2 border-none outline-none text-white cursor-pointer aspect-square bg-[#004AC6]"
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewModels
