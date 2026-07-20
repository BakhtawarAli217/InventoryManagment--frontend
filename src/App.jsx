import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from "./Pages/ItemPage";
import Additem from "./Pages/Additem";
import { ToastContainer , Bounce } from "react-toastify";

const App = () => {
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
      <Routes>
        <Route path="/" element={<ItemPage />} />
        <Route path="/Add-inventory" element={<Additem />} />
      </Routes>
    </Router>
  );
};

export default App;
