import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DataDisplay from "../../Components/DataDisplay";
import { BsFillBarChartFill } from "react-icons/bs";

import { Bar, Line } from "react-chartjs-2";
import {
  data2,
  options,
  data,
  options2,
} from "../../Features/Utils/ChartsData";

const Dashboard = () => {
  const location = useLocation();

  const BarChart = () => {
    return (
      <div className="bg-slate-100 shadow-2xl drop-shadow-2xl rounded-xl px-5 py-10">
        <div>
          <div>
            <span className="text-4xl">Orders Summary</span>
          </div>
          <div></div>
        </div>
        <div className="w-auto h-auto">
          <Bar options={options} data={data} />
        </div>
        <div className="flex flex-row flex-wrap justify-around gap-x-5 gap-y-2 mt-5">
          <div className="flex flex-col p-5 xl:pr-10 border-[1px] border-gray-400 bg-white rounded-xl">
            <span className="text-xl xl:text-3xl font-bold">30</span>
            <span className="text-base">On Delivery</span>
          </div>
          <div className="flex flex-col p-5 xl:pr-10 border-[1px] border-gray-400 bg-white rounded-xl">
            <span className="text-xl xl:text-3xl font-bold">100</span>
            <span className="text-base">Delivered</span>
          </div>
          <div className="flex flex-col p-5 xl:pr-10 border-[1px] border-gray-400 bg-white rounded-xl">
            <span className="text-xl xl:text-3xl font-bold">15</span>
            <span className="text-base">Cancelled</span>
          </div>
        </div>
      </div>
    );
  };

  const LineChart = () => {
    return (
      <div className="bg-slate-100 shadow-2xl drop-shadow-2xl rounded-xl px-5 py-10">
        <div>
          <div>
            <span className="text-4xl">Revenue Summary</span>
          </div>
          <div className="flex flex-row my-5 gap-x-2">
            <div className="text-4xl text-primary_bg flex justify-center items-center">
              <BsFillBarChartFill />
            </div>
            <div className="flex flex-col">
              <span className="text-lg">Income</span>
              <span className="text-3xl font-semibold">&#8369;100,000</span>
            </div>
          </div>
        </div>
        <div className="w-auto h-auto min-h-[8rem]">
          <Line options={options2} data={data2} />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-auto min-h-screen bg-slate-50 font-anek px-5 xl:px-20 pb-20">
      <div className="py-10">
        <h1 className="xl:text-left text-center text-6xl font-bold tracking-wide">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-5 gap-y-5">
        <DataDisplay
          title="Total Revenue"
          isCurrency={true}
          figures="100,000"
          progressBarTitle="Revenue"
          progressText="95%"
        />
        <DataDisplay
          title="Total Orders"
          isCurrency={false}
          figures="9,000"
          progressBarTitle="Orders"
          progressText="90%"
        />
        <DataDisplay
          title="Total Customers"
          isCurrency={false}
          figures="5,000"
          progressBarTitle="Orders"
          progressText="80%"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-5 mt-10">
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
};

export default Dashboard;
