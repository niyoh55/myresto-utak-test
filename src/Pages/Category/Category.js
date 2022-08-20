import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  editCategoryAPI,
  getCategoryAPI,
} from "../../Features/Slices/CategorySlice";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner";
import InputField from "../../Components/InputField";

const Category = () => {
  const [addCategoryInput, setAddCategoryInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryInput, setEditCategoryInput] = useState("");
  const [editCategoryID, setEditCategoryID] = useState("");
  const [searchCategoryInput, setSearchCategoryInput] = useState("");
  const dispatch = useDispatch();

  const { categories, isLoading, isError, isDeleteLoading } = useSelector(
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

  const handleEdit = (category) => {
    setIsModalOpen(true);
    setEditCategoryInput(category.categoryName);
    setEditCategoryID(category.categoryID);
  };

  const handleSaveModal = async (category) => {
    let res = await dispatch(
      editCategoryAPI({
        categoryName: editCategoryInput,
        categoryID: editCategoryID,
      })
    );

    if (res.meta.requestStatus == "fulfilled") {
      toast.info("Edit Successful");
      handleModalCancel();
    } else {
      toast.error("Edit Failed");
      handleModalCancel();
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditCategoryInput("");
    setEditCategoryID("");
  };

  return (
    <div className="w-full h-auto min-h-screen max-w-full px-5 md:px-10 lg:px-20">
      <div className="flex flex-col mb-10 md:mb-0 md:flex-row gap-x-10 justify-between items-center">
        <div>
          <h1 className="xl:text-left text-center text-6xl font-anek py-10 font-bold tracking-wide">
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

      {/* Search field */}
      <div className="flex flex-row gap-x-20 justify-start items-start">
        <div className="form-control w-auto">
          <label className="label">
            <span className="label-text">Search Category:</span>
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
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <table className="table table-normal table-zebra w-full ">
            <thead>
              <tr className="text-center">
                <th>Category Name</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody className="text-center ">
              {categoriesList
                .filter((category) => {
                  if (
                    category?.categoryName
                      .toLowerCase()
                      .match(
                        searchCategoryInput
                          ? searchCategoryInput.toLowerCase()
                          : ""
                      ) !== null
                  ) {
                    return category;
                  }
                })
                .map((category) => {
                  return (
                    <tr key={category.categoryID}>
                      <td className="text-base font-anek font-normal sm:text-base md:text-lg xl:text-xl">
                        {category.categoryName}
                      </td>
                      <td className="flex flex-row justify-center items-center gap-x-5 ">
                        <button
                          className="btn bg-primary_bg hover:bg-primary_bg text-white"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            dispatch(
                              deleteCategoryAPI({
                                categoryID: category.categoryID,
                              })
                            )
                          }
                          className="btn bg-red_btn hover:bg-red_btn text-white"
                        >
                          {isDeleteLoading ? <Spinner /> : "Delete"}
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

      <div className={`modal ${isModalOpen && "modal-open"}`}>
        <div className="modal-box">
          <InputField
            title="Category Name"
            name="editCategory"
            onChange={(e) => setEditCategoryInput(e.target.value)}
            value={editCategoryInput}
            type="text"
          />

          <div className="modal-action">
            <button
              className="btn text-white bg-primary_bg"
              onClick={handleSaveModal}
            >
              Save
            </button>
            <button
              className="btn text-white bg-red_btn"
              onClick={handleModalCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
