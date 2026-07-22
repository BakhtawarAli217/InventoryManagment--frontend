import React, { useState ,useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'

const ViewCategories = () => {
    const [data , setData]=useState([])

    const fetchData=async ()=>{
        try {
            const url=`${import.meta.env.VITE_CATEGORY_BASE_URL}/Get-All-Categories`;
            const response = await axios.get(url);
            setData(response.data.data);
          
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Error fetching categories" , {
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
    const handleDelete=async (id)=>{
        try {
            const confirmed = window.confirm("Are you sure you want to delete this category?");
            if (!confirmed) return;
            const url=`${import.meta.env.VITE_CATEGORY_BASE_URL}/Delete-Category/${id}`;
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
            console.error("Error deleting category:", error.response?.data?.error || error?.response?.data?.message || "An error occurred during category deletion");
            toast.error("Error deleting category" , {
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
    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className='itempage'>
      <Navbar/>
      <div className="itempage-content">
        <table  className="w-full border border-gray-300 rounded-lg overflow-auto backdrop:blur-md bg-white/30">
            <thead>
                <tr>
                    <th>Sr</th>
                    <th>Id</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((category, index) => (
                    <tr key={category.id}>
                        <td  className="border border-gray-300 !p-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 !p-2 text-center">{category.id}</td>
                        <td className="border border-gray-300 !p-2 text-center">{category.name}</td>
                        <td className="border border-gray-300 !p-2 text-center">
                            <button onClick={()=>handleDelete(category.id)} className="bg-red-500 text-white !px-2 !py-1 cursor-pointer w-full rounded hover:bg-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewCategories
