import React, { useState ,useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'

const ViewModels = () => {
    const [data , setData]=useState([])

    const fetchData=async ()=>{
        try {
            const url=`${import.meta.env.VITE_MODEL_BASE_URL}/Get-All-Models`;
            const response = await axios.get(url);
            setData(response.data.data);
          
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
        }
    }
    const handleDelete=async (id)=>{
        try {
            const confirmed = window.confirm("Are you sure you want to delete this model?");
            if (!confirmed) return;
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
                    <th>Model Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((model, index) => (
                    <tr key={model.id}>
                        <td  className="border border-gray-300 !p-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 !p-2 text-center">{model.id}</td>
                        <td className="border border-gray-300 !p-2 text-center">{model.name}</td>
                        <td className="border border-gray-300 !p-2 text-center">
                            <button onClick={()=>handleDelete(model.id)} className="bg-red-500 text-white !px-2 !py-1 cursor-pointer w-full rounded hover:bg-red-600">
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

export default ViewModels
