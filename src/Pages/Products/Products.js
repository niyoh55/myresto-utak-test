import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProductAPI,
  getProductsAPI,
} from "../../Features/Slices/ProductSlice";
import Spinner from "../../Components/Spinner";
import { getCategoryAPI } from "../../Features/Slices/CategorySlice";

const Products = () => {
  const [searchProductInput, setSearchProductInput] = useState("");
  const [searchCategoryInput, setSearchCategoryInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isLoading, isError, isDeleteLoading } = useSelector(
    (state) => state.product
  );

  const [productsList, setProductsList] = useState(products ? products : []);

  useEffect(() => {
    dispatch(getProductsAPI());
  }, []);

  useEffect(() => {
    setProductsList(products);
  }, [products]);

  const { categories } = useSelector((state) => state.category);
  const [categoriesList, setCategoriesList] = useState(
    categories ? categories : []
  );

  useEffect(() => {
    dispatch(getCategoryAPI());
  }, []);

  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  const editProductHandler = (product) => {
    navigate(`/products/edit-product/${product.productID}`, {
      state: { ...product, isEdit: true },
    });
  };

  const deleteProductHandler = (productID) => {
    dispatch(deleteProductAPI({ productID: productID }));
  };

  return (
    <div className="w-full min-h-screen max-w-full px-20 font-anek">
      <div className="flex flex-row gap-x-10 justify-between items-center">
        <div>
          <h1 className="text-6xl font-anek py-10 font-bold tracking-wide">
            Products
          </h1>
        </div>

        <button
          onClick={() => navigate("/products/add-product")}
          className="bg-green_btn text-white py-5 px-5 text-base rounded-md font-semibold active:scale-105 transition-all duration-200"
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
            value={searchProductInput}
            onChange={(e) => setSearchProductInput(e.target.value)}
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
            value={searchCategoryInput}
            onChange={(e) => setSearchCategoryInput(e.target.value)}
            className="input input-md input-bordered w-full max-w-xs "
          />
        </div>
      </div>

      <div className="overflow-x-auto my-10 flex flex-col gap-y-10 justify-center items-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <table className="table table-zebra table-compact w-full">
            <thead>
              <tr>
                <th className="text-center">Product Name</th>
                <th>Category</th>
                <th>Cost</th>
                <th>Price</th>
                <th>Stock</th>
                <th>View/Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {productsList
                .filter((product) => {
                  if (
                    product?.productName
                      .toLowerCase()
                      .match(
                        searchProductInput
                          ? searchProductInput.toLowerCase()
                          : ""
                      ) !== null &&
                    product?.category
                      .toLowerCase()
                      .match(
                        searchCategoryInput
                          ? searchCategoryInput.toLowerCase()
                          : ""
                      ) !== null
                  ) {
                    return product;
                  }
                })
                .map((product) => {
                  const {
                    productName,
                    category,
                    productID,
                    price,
                    stock,
                    cost,
                  } = product;
                  return (
                    <tr key={product.productID}>
                      <td className="text-center ">{productName}</td>
                      <td>{category}</td>
                      <td>&#8369;{cost}</td>
                      <td>&#8369;{price}</td>
                      <td>{stock}</td>
                      <td className="flex flex-row gap-x-5 ">
                        <button className="btn bg-green_btn hover:bg-green_btn text-white">
                          View
                        </button>
                        <button
                          className="btn bg-primary_bg hover:bg-primary_bg text-white"
                          onClick={() => editProductHandler(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn bg-red_btn hover:bg-red_btn text-white"
                          onClick={() =>
                            deleteProductHandler(product.productID)
                          }
                        >
                          {isDeleteLoading ? (
                            <Spinner heightAndWidth={`h-4 w-4`} />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {/* <div className="btn-group">
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
        </div> */}
      </div>
    </div>
  );
};

export default Products;
