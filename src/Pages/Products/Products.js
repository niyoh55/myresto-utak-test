import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Features/Slices/ProductSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arrOfID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="w-full max-w-full">
      <div className="flex flex-row gap-x-10 justify-between items-center">
        <div>
          <h1 className="text-6xl font-anek py-10 font-bold tracking-wide">
            Products
          </h1>
        </div>

        <button
          // onClick={() => dispatch(addProduct({ name: "niyoh edwyn" }))}
          onClick={() => navigate("/products/add-product")}
          className="bg-green_btn py-5 px-5 text-base rounded-md font-semibold active:scale-105 transition-all duration-200"
        >
          ADD PRODUCT
        </button>
      </div>

      {/* Search fields */}
      <div className="flex flex-row gap-x-20 justify-start items-start">
        <div className="form-control w-auto">
          <label className="label">
            <span className="label-text">Search Product:</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-md input-bordered w-full max-w-xs "
          />
        </div>

        <div className="form-control w-auto">
          <label className="label">
            <span className="label-text">Filter By Category:</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-md input-bordered w-full max-w-xs "
          />
        </div>
      </div>

      <div className="overflow-x-auto my-10 flex flex-col gap-y-10 justify-center items-center">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="text-center">Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {arrOfID.map((id) => {
              return (
                <tr key={id}>
                  <th className="text-center">{id}</th>
                  <td>Sinigang na Mais</td>
                  <td>Soup</td>
                  <td>&#8369;100.00</td>
                  <td>&#8369;200.00</td>
                  <td>50</td>
                  <td className="flex flex-row gap-x-5 ">
                    <button className="btn bg-primary_bg hover:bg-primary_bg text-white">
                      Edit
                    </button>
                    <button className="btn bg-red_btn hover:bg-red_btn text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="btn-group">
          <input
            type="radio"
            name="options"
            data-title="1"
            className="btn"
            defaultChecked
          />
          <input type="radio" name="options" data-title="2" className="btn" />
          <input type="radio" name="options" data-title="3" className="btn" />
          <input type="radio" name="options" data-title="4" className="btn" />
        </div>
      </div>
    </div>
  );
};

export default Products;
