import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editProductAPI } from "../../../Features/Slices/ProductSlice";
import { toast } from "react-toastify";
import { addCategoryAPI } from "../../../Features/Slices/CategorySlice";
import InputField from "../../../Components/InputField";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
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
    addOns: addOnsCopy,
  } = location.state ? location.state : "null";

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    } else {
    }
  }, []);

  let categoryCopy = category;

  const [inputs, setInputs] = useState(
    hasOptions && variations
      ? [...variations]
      : [{ variationName: "", additionalCost: 0 }]
  );
  const [addOns, setAddons] = useState(
    hasAddons && addOnsCopy
      ? [...addOnsCopy]
      : [{ addOnName: "", additionalCost: 0 }]
  );
  const [addCategoryInput, setAddCategoryInput] = useState("");
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const [categoriesList, setCategoriesList] = useState(categories);

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (addCategoryInput.length !== 0) {
      dispatch(addCategoryAPI({ categoryName: addCategoryInput }));
      setAddCategoryInput("");
    } else {
      toast.error("Input field should not be empty.");
    }
  };

  const handleVariationInput = (e) => {
    e.persist();

    const newInputs = [...inputs];

    if (e.target.name == "variationName") {
      newInputs[e.target.id].variationName = e.target.value;
    } else if (e.target.name == "additionalCost") {
      newInputs[e.target.id].additionalCost = e.target.value;
    }

    if (
      e.target.value &&
      newInputs.every(
        (input) => input.variationName && input.additionalCost.length !== 0
      )
    ) {
      newInputs.push({ variationName: "", additionalCost: 0 });
    }

    setInputs(newInputs);
  };

  const handleAddOnInput = (e) => {
    e.persist();

    const newInputs = [...addOns];

    if (e.target.name == "addOnName") {
      newInputs[e.target.id].addOnName = e.target.value;
    } else if (e.target.name == "additionalCost") {
      newInputs[e.target.id].additionalCost = e.target.value;
    }

    if (
      e.target.value &&
      newInputs.every(
        (input) => input.addOnName && input.additionalCost.length !== 0
      )
    ) {
      newInputs.push({ addOnName: "", additionalCost: 0 });
    }

    setAddons(newInputs);
  };

  return (
    <div className="w-full h-full min-h-screen px-20 ">
      <div className="py-10">
        <h1 className="text-7xl font-anek font-bold tracking-wide mb-5 ">
          Edit Product
        </h1>
      </div>

      <Formik
        initialValues={{
          productName: productName,
          price: price,
          cost: cost,
          stock: stock,
          hasOptions: hasOptions,
          optionName: optionName,
          category:
            categoriesList?.findIndex((category) => {
              console.log(category);
              console.log(categoryCopy);
              return category.categoryName == categoryCopy;
            }) >= 0
              ? categoryCopy
              : "Please select a category...",
          hasAddons: hasAddons,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.productName) {
            errors.productName = "Product name required.";
          }

          if (
            values.price.length === 0 ||
            values.price < 0 ||
            isNaN(values.price)
          ) {
            errors.price = "Valid price required.";
          }

          if (
            values.cost.length === 0 ||
            values.cost < 0 ||
            isNaN(values.cost)
          ) {
            errors.cost = "Valid cost required.";
          }

          if (
            values.stock.length === 0 ||
            values.stock < 0 ||
            isNaN(values.stock)
          ) {
            errors.stock = "Valid stock required.";
          }

          if (values.hasOptions && values.optionName.length == 0) {
            errors.optionName = "Option name required.";
          }

          if (
            !values.category ||
            values.category.length == 0 ||
            values.category == "Please select a category..."
          ) {
            errors.category = "Category required.";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let {
            productName,
            price,
            stock,
            cost,
            hasOptions,
            category,
            optionName,
            hasAddons,
          } = values;
          console.log(values);
          let status = await dispatch(
            editProductAPI({
              productName,
              price: Number(price),
              stock: Number(stock),
              cost: Number(cost),
              hasOptions,
              optionName,
              category,
              inputs,
              hasAddons,
              addOns,
              productID,
            })
          );
          console.log(status.payload);
          if (status.payload.name || status.payload) {
            resetForm();
            setInputs([{ variationName: "", additionalCost: 0 }]);
            setAddons([{ addOnName: "", additionalCost: 0 }]);
            navigate("/products", { replace: true });
          } else {
            toast.error("Form Submission Failed");
          }

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-row px-20">
              <div className="flex flex-col flex-1 gap-y-3">
                <InputField
                  title="Product Name"
                  type="text"
                  name="productName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.productName}
                  errors={errors.productName && touched.productName}
                />
                {errors.productName &&
                  touched.productName &&
                  errors.productName}

                <InputField
                  title="Price"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  errors={errors.price && touched.price}
                />
                {errors.price && touched.price && errors.price}

                <InputField
                  title="Cost"
                  type="number"
                  name="cost"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cost}
                  errors={errors.cost && touched.cost}
                />
                {errors.cost && touched.cost && errors.cost}

                <InputField
                  title="Stock"
                  type="number"
                  name="stock"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stock}
                  errors={errors.stock && touched.stock}
                />
                {errors.stock && touched.stock && errors.stock}

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-xl">Category</span>
                  </label>

                  <Field
                    as="select"
                    name="category"
                    className="select select-bordered"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option className="text-lg" value={"none"}>
                      Please select a category...
                    </option>
                    {categoriesList.map((category) => {
                      return (
                        <option
                          className="text-lg"
                          key={category.categoryID}
                          value={category.categoryName}
                        >
                          {category.categoryName}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                {errors.category && touched.category && errors.category}

                <div className="form-control max-w-xs w-full">
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      placeholder="Add Category"
                      className="input input-bordered input-group-lg"
                      value={addCategoryInput}
                      onChange={(e) => setAddCategoryInput(e.target.value)}
                    />
                    <button
                      onClick={(e) => handleAddCategory(e)}
                      type="button"
                      className="btn font-anek font-semibold text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Half of form */}
              <div className="flex-1 flex flex-col gap-y-3">
                <div className="flex flex-row items-center justify-start gap-x-10">
                  <label className="text-2xl">Has Options?</label>
                  <Field
                    type="checkbox"
                    name="hasOptions"
                    className="checkbox checkbox-lg"
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <InputField
                    title={"Option Name"}
                    name={"optionName"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.optionName}
                    errors={errors.optionName && touched.optionName}
                    disabled={!values.hasOptions}
                  />

                  {errors.optionName && touched.optionName && errors.optionName}

                  {inputs.map((input, i) => {
                    return (
                      <div className="flex flex-row gap-x-5" key={i}>
                        <div className="form-control w-full max-w-xs">
                          <label
                            className={`label ${i == 0 ? "" : "hidden"}`}
                            htmlFor="price"
                          >
                            <span className="label-text text-xl">
                              Variations
                            </span>
                          </label>
                          <input
                            disabled={!values.hasOptions}
                            id={i}
                            value={input.variationName}
                            name="variationName"
                            onChange={handleVariationInput}
                            className="input input-bordered input-md"
                          />
                        </div>
                        <div className="form-control w-full max-w-xs">
                          <label
                            className={`label ${i == 0 ? "" : "hidden"}`}
                            htmlFor="price"
                          >
                            <span className="label-text text-xl">
                              Additional Cost
                            </span>
                          </label>
                          <input
                            disabled={!values.hasOptions}
                            id={i}
                            type="number"
                            value={input.additionalCost}
                            name="additionalCost"
                            onChange={handleVariationInput}
                            className={`input input-bordered input-md ${
                              isNaN(input.additionalCost) && "input-error"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex flex-row items-center justify-start gap-x-10 mt-5">
                    <label className="text-2xl">Has Add-Ons?</label>
                    <Field
                      type="checkbox"
                      name="hasAddons"
                      className="checkbox checkbox-lg"
                    />
                  </div>

                  {/* Add-Ons */}
                  {addOns.map((input, i) => {
                    return (
                      <div className="flex flex-row gap-x-5" key={i}>
                        <div className="form-control w-full max-w-xs">
                          <label
                            className={`label ${i == 0 ? "" : "hidden"}`}
                            htmlFor="price"
                          >
                            <span className="label-text text-xl">Add-Ons</span>
                          </label>
                          <input
                            disabled={!values.hasAddons}
                            id={i}
                            value={input.addOnName}
                            name="addOnName"
                            onChange={handleAddOnInput}
                            className="input input-bordered input-md"
                          />
                        </div>
                        <div className="form-control w-full max-w-xs">
                          <label
                            className={`label ${i == 0 ? "" : "hidden"}`}
                            htmlFor="price"
                          >
                            <span className="label-text text-xl">
                              Additional Cost
                            </span>
                          </label>
                          <input
                            disabled={!values.hasAddons}
                            id={i}
                            type="number"
                            value={input.additionalCost}
                            name="additionalCost"
                            onChange={handleAddOnInput}
                            className={`input input-bordered input-md ${
                              isNaN(input.additionalCost) && "input-error"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center my-20">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-lg w-1/2  text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;
