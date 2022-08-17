import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  getCategoryAPI,
} from "../../Features/Slices/CategorySlice";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner";

const Category = () => {
  const [addCategoryInput, setAddCategoryInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, isLoading, isError } = useSelector(
    (state) => state.category
  );
  const [categoriesList, setCategoriesList] = useState(
    categories ? categories : []
  );

  useEffect(() => {
    dispatch(getCategoryAPI());
  }, []);

  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (addCategoryInput.length !== 0) {
      dispatch(addCategoryAPI({ categoryName: addCategoryInput }));
      setAddCategoryInput("");
    } else {
      toast.error("Input field should not be empty.");
    }
  };

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-row gap-x-10 justify-between items-center">
        <div>
          <h1 className="text-6xl font-anek py-10 font-bold tracking-wide">
            Category
          </h1>
        </div>
        <div className="form-control">
          <div className="input-group input-group-md">
            <input
              type="text"
              placeholder=""
              value={addCategoryInput}
              className="input input-md input-bordered"
              onChange={(e) => setAddCategoryInput(e.target.value)}
            />
            <button
              className="btn btn-md text-white"
              onClick={(e) => handleAddCategory(e)}
            >
              {isLoading ? <Spinner /> : "Add Category"}
            </button>
          </div>
        </div>
      </div>

      {/* Search fields */}
      <div className="flex flex-row gap-x-20 justify-start items-start">
        <div className="form-control w-auto">
          <label className="label">
            <span className="label-text">Search Category:</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-md input-bordered w-full max-w-xs "
          />
        </div>
      </div>

      <div className="overflow-x-auto my-10 flex flex-col gap-y-10 justify-center items-center">
        <table className="table table-normal table-zebra w-full ">
          <thead>
            <tr className="text-center">
              <th>Category Name</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody className="text-center ">
            {categoriesList.map((category) => {
              return (
                <tr key={category.categoryID}>
                  <td className="text-2xl">{category.categoryName}</td>
                  <td className="flex flex-row justify-center items-center gap-x-5 ">
                    <button className="btn bg-primary_bg hover:bg-primary_bg text-white">
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          deleteCategoryAPI({ categoryID: category.categoryID })
                        )
                      }
                      className="btn bg-red_btn hover:bg-red_btn text-white"
                    >
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

export default Category;
