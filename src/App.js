import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Category from "./Pages/Category/Category";
import Dashboard from "./Pages/Dashboard.js/Dashboard";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import AddProduct from "./Pages/Products/AddProduct/AddProduct";
import Products from "./Pages/Products/Products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [currSelected, setCurrSelected] = useState("Dashboard");

  return (
    <div
      className="w-auto h-auto max-w-[100vw] min-h-screen bg-white font-anek"
      // data-theme="mytheme"
    >
      <div className="h-full w-full min-h-screen flex flex-row">
        <div className="flex-[0] bg-primary_bg">
          <Sidebar />
        </div>

        <div className="flex-[9] bg-slate-100 w-full xl:px-20">
          {/* Display Current Page based on path */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />}></Route>
            <Route path="/products/add-product" element={<AddProduct />} />
            <Route path="/categories" element={<Category />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
