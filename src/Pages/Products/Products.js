import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAPI,
  getProductsAPI,
} from "../../Features/Slices/ProductSlice";
import Spinner from "../../Components/Spinner";
import { getCategoryAPI } from "../../Features/Slices/CategorySlice";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

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

  const viewProductHandler = (product) => {
    navigate(`/products/view-product/${product.productID}`, {
      state: { ...product },
    });
  };

  const editProductHandler = (product) => {
    navigate(`/products/edit-product/${product.productID}`, {
      state: { ...product, isEdit: true },
    });
  };

  const deleteProductHandler = (productID) => {
    dispatch(deleteProductAPI({ productID: productID }));
  };

  const tdStyle = "";

  return (
    <div className="w-full min-h-screen max-w-full xl:px-20 pl-5 font-anek">
      <div className="flex sm:flex-row flex-col gap-x-10 justify-between items-center">
        <div>
          <h1 className="text-6xl font-anek py-10 font-bold tracking-wide">
            Products
          </h1>
        </div>

        <button
          onClick={() => navigate("/products/add-product")}
          className="bg-primary_bg border-[1px] border-black text-white p-3 md:py-5 md:px-5 text-base rounded-md font-semibold active:scale-105 transition-all duration-200"
        >
          ADD PRODUCT
        </button>
      </div>

      {/* Search fields */}
      <div className="flex flex-row gap-x-20 justify-between items-center sm:justify-start sm:items-start">
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

      <div className=" w-full my-10 flex flex-col gap-y-10 justify-center items-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table className="">
            <Thead>
              <Tr className="bg-gray-300 border-[1px] border-black">
                <Th className="py-2">Product Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Cost</Th>
                <Th>Option Name</Th>
                <Th>Has Add-Ons</Th>
                <Th>Stock</Th>
                <Th>View/Edit/Delete</Th>
              </Tr>
            </Thead>
            <Tbody className="text-center">
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
                    hasOptions,
                    hasAddons,
                    variations,
                    addOns,
                    optionName,
                  } = product;
                  return (
                    <Tr key={product.productID} className="hover:bg-gray-300">
                      <Td className={tdStyle + " font-semibold"}>
                        {productName}
                      </Td>
                      <Td className={tdStyle}>{category}</Td>
                      <Td className={tdStyle}>&#8369;{price}</Td>
                      <Td className={tdStyle}>&#8369;{cost}</Td>
                      <Td className={tdStyle}>
                        {optionName ? optionName : "N/A"}
                      </Td>
                      <Td className={tdStyle}> {hasAddons ? "Y" : "N"}</Td>
                      <Td className={tdStyle}>{stock}</Td>
                      <Td
                        className={`flex flex-row justify-center items-center gap-x-5 h-full border-0 ${tdStyle}`}
                      >
                        <button
                          className="btn bg-green_btn hover:bg-green_btn text-white btn-xs xl:btn-md"
                          onClick={() => viewProductHandler(product)}
                        >
                          View
                        </button>
                        <button
                          className="btn bg-primary_bg hover:bg-primary_bg text-white btn-xs xl:btn-md"
                          onClick={() => editProductHandler(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn bg-red_btn hover:bg-red_btn text-white btn-xs xl:btn-md"
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
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Products;
