import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from "./Pages/ItemPage";
import { ToastContainer , Bounce } from "react-toastify";
import ViewCategories from "./Pages/ViewCategories"
import ViewBrand from "./Pages/ViewBrand";
import ViewModels from "./Pages/ViewModels";
import { loadingContext } from "./context/LoadingContextProvider";
import Loader from "./Components/Loader";


const App = () => {
  const {loading}=useContext(loadingContext)
  return (
    <Router>
        {loading && <Loader/>}
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
    
      <Routes>
        <Route path="/" element={<ItemPage />} />
        <Route path="/category" element={<ViewCategories/>} />
        <Route path="/models" element={<ViewModels/>}/>
        <Route path="/brand" element={<ViewBrand/>}/>
      </Routes>
    </Router>
  );
};

export default App;
