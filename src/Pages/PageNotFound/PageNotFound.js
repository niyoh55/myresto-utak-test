import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-y-20">
      <h1 className="text-8xl font-anek">Page not found.</h1>

      <button onClick={() => navigate("/")} className="p-5 bg-primary_bg">
        <h1 className="text-3xl text-white">Redirect to Dashboard</h1>
      </button>
    </div>
  );
};

export default PageNotFound;
