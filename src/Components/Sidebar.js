import { useEffect, useState } from "react";
import {
  MdDashboard,
  MdOutlineMenuBook,
  MdOutlineCategory,
} from "react-icons/md";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = (props) => {
  const [isHidden, setIsHidden] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currLocation = location.pathname;

  useEffect(() => {
    if (currLocation == "/") {
      document.title = "Dashboard";
    } else if (currLocation == "/products") {
      document.title = "Products";
    } else if (currLocation == "/categories") {
      document.title = "Categories";
    } else if (currLocation == "/products/add-product") {
      document.title = "Add Product";
    } else {
      document.title = "MyResto App";
    }
  }, [currLocation]);

  return (
    <motion.div
      animate={{
        width: isHidden ? ["100%", "0%"] : ["0%", "100%"],
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`
        flex flex-col h-screen min-h-screen justify-start items-center text-black px-2 text-center relative flex-auto bg-primary_bg`}
      //onClick={() => setIsClicked((x) => !x)}
    >
      <motion.button
        className={`h-32 w-32`}
        animate={{
          display: isHidden ? "none" : "flex",
          width: isHidden ? "0%" : "100%",
        }}
        transition={{ delay: isHidden ? 0.3 : 0.1 }}
        // onClick={() => navigate("/")}
      >
        <img
          src="https://i.ibb.co/ym9rwqf/My-Resto-Logo-Updated.png"
          alt="MyResto Logo"
        />
      </motion.button>
      <motion.div
        className={`w-full flex flex-col gap-y-10 flex-1`}
        animate={{
          display: isHidden ? "none" : "flex",
          width: isHidden ? "0%" : "100%",
        }}
        transition={{ delay: isHidden ? 0.3 : 0.1 }}
      >
        <button
          className={`${
            currLocation == "/" ? " bg-white" : " text-white"
          } px-2  w-full flex flex-col items-center justify-center gap-y-2 rounded-xl`}
          onClick={() => {
            navigate("/");
          }}
        >
          <MdDashboard className="text-6xl" />
          <h1 className="text-lg">Dashboard</h1>
        </button>

        <button
          className={`${
            currLocation == "/products" ? " bg-white" : " text-white"
          } px-2  w-full flex flex-col items-center justify-center gap-y-2 rounded-xl`}
          onClick={() => {
            navigate("/products");
          }}
        >
          <MdOutlineMenuBook className="text-6xl" />
          <h1 className="text-lg">Products</h1>
        </button>

        <button
          className={`${
            currLocation == "/categories" ? " bg-white" : " text-white"
          } px-2  w-full flex flex-col items-center justify-center gap-y-2 rounded-xl`}
          onClick={() => {
            navigate("/categories");
          }}
        >
          <MdOutlineCategory className="text-6xl" />
          <h1 className="text-lg">Categories</h1>
        </button>
      </motion.div>

      <div
        className="absolute right-[-20px] top-[50%] h-10 w-10 bg-primary_bg rounded-full flex justify-center items-center text-2xl text-white"
        onClick={() => setIsHidden((state) => !state)}
      >
        {isHidden ? (
          <BsFillArrowRightCircleFill />
        ) : (
          <BsFillArrowLeftCircleFill />
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
