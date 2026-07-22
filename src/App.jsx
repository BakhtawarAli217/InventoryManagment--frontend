import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from "./Pages/ItemPage";
import Additem from "./Pages/Additem";
import { ToastContainer , Bounce } from "react-toastify";
import AddCategory from "./Pages/AddCategory";
import ViewCategories from "./Pages/ViewCategories"
import AddModels from "./Pages/AddModels";
import ViewBrand from "./Pages/ViewBrand";
import ViewModels from "./Pages/ViewModels";
import AddBrand from "./Pages/AddBrand";
import { loadingContext } from "./context/LoadingContextProvider";
import Loader from "./Components/loader";


const App = () => {
  const {loading}=useContext(loadingContext)
  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {loading && <Loader/>}
      <Routes>
        <Route path="/" element={<ItemPage />} />
        <Route path="/category" element={<ViewCategories/>} />
        <Route path="/Add-inventory" element={<Additem />} />
        <Route path="/Add-Category" element={<AddCategory />} />
        <Route path="/Add-Models" element={<AddModels />} />
        <Route path="/models" element={<ViewModels/>}/>
        <Route path="/brand" element={<ViewBrand/>}/>
        <Route path="/Add-Brands" element={<AddBrand/>}/>
      </Routes>
    </Router>
  );
};

export default App;
