import React, { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ViewProduct = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    productName,
    price,
    stock,
    cost,
    hasOptions,
    category,
    optionName,
    hasAddons,
    productID,
    variations,
    addOns,
  } = location.state ? location.state : "null";

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    } else {
    }
  }, []);

  const DataDisplay = (props) => {
    let { title, data, isCurrency } = props;
    return (
      <div className="">
        <span className="text-2xl md:text-3xl xl:text-4xl">
          <span className="font-bold">{title}</span> :{" "}
          {isCurrency ? <span>&#8369;{data}</span> : <span>{data}</span>}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full h-auto min-h-screen bg-slate-50 font-anek px-5 xl:px-20 pb-20">
      <div className="py-10">
        <h1 className="xl:text-left text-center text-6xl font-bold tracking-wide">View Product</h1>
      </div>

      <div className="flex flex-col xl:flex-row w-full gap-y-5 px-10 py-10 border-2 border-gray-300 shadow-2xl rounded-2xl">
        <div className="flex flex-1 flex-col gap-y-5">
          <DataDisplay title="Product Name" data={productName} />
          <DataDisplay title="Category" data={category} />
          <DataDisplay title="Price" data={price} isCurrency={true} />
          <DataDisplay title="Cost" data={cost} isCurrency={true} />
          <DataDisplay title="Stock" data={stock} />
        </div>
        <div className="flex flex-1 flex-col gap-y-5">
          <DataDisplay title="Has Options" data={hasOptions ? "Yes" : "No"} />
          <DataDisplay
            title="Option Name"
            data={hasOptions ? optionName : "N/A"}
          />
          <DataDisplay
            title="Variations"
            data={
              hasOptions
                ? variations.map((variation) => (
                    <span key={variation.variationName}>
                      <span className="font-medium">
                        {variation.variationName}
                      </span>
                      ({variation.additionalCost}),{" "}
                    </span>
                  ))
                : "N/A"
            }
          />
          <DataDisplay title="Has Add-Ons" data={hasAddons ? "Yes" : "No"} />
          <DataDisplay
            title="Add-Ons"
            data={
              hasAddons
                ? addOns.map((addOn) => (
                    <span key={addOn.addOnName}>
                      <span className="font-medium">{addOn.addOnName}</span>(
                      {addOn.additionalCost}),{" "}
                    </span>
                  ))
                : "N/A"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
