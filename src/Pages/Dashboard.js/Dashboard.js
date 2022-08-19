import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Dashboard = () => {
  const arrOfID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);
  return (
    <div className="w-full h-full min-h-screen bg-slate-50">
      <h1 className="text-9xl">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
