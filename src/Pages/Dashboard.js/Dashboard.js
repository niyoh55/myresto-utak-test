import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Dashboard = () => {
  const location = useLocation();

  console.log(location.state);
  return (
    <div className="w-full h-full min-h-screen bg-slate-50">
      <h1 className="text-9xl">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
