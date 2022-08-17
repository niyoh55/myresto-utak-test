import React from "react";
import { Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { addProductAPI } from "../../../Features/Slices/ProductSlice";
import { toast } from "react-toastify";
const AddProduct = () => {
  const processData = (data) => {
    console.log(data);
  };

  const dispatch = useDispatch();

  return (
    <div className="w-full h-full py-10">
      <h1 className="text-7xl font-anek font-bold tracking-wide mb-5 ">
        Add Product
      </h1>

      <Formik
        initialValues={{
          productName: "",
          price: 0,
          cost: 0,
          stock: 0,
          hasOptions: false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.productName) {
            errors.productName = "Product name required.";
          }

          if (
            !values.price.length === 0 ||
            values.price < 0 ||
            isNaN(values.price)
          ) {
            errors.price = "Valid price required.";
          }

          if (
            !values.cost.length === 0 ||
            values.cost < 0 ||
            isNaN(values.cost)
          ) {
            errors.cost = "Valid cost required.";
          }

          if (
            !values.stock.length === 0 ||
            values.stock < 0 ||
            isNaN(values.stock)
          ) {
            errors.stock = "Valid stock required.";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let { productName, price, stock, cost, hasOptions } = values;
          setTimeout(async () => {
            // console.log(values);

            let status = await dispatch(
              addProductAPI({ productName, price, stock, cost, hasOptions })
            );

            if (status.payload.name) {
              resetForm();
            } else {
              toast.error("Form Submission Failed");
            }

            setSubmitting(false);
          }, 400);
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
            <div className="flex flex-row">
              <div className="flex flex-col flex-1 gap-y-3">
                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="productName">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    name="productName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productName}
                  />
                </div>

                {errors.productName &&
                  touched.productName &&
                  errors.productName}

                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="price">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    type="numeric"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </div>
                {errors.price && touched.price && errors.price}

                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="Cost">
                    <span className="label-text">Cost</span>
                  </label>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    type="numeric"
                    name="cost"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cost}
                  />
                </div>
                {errors.cost && touched.cost && errors.cost}

                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="stock">
                    <span className="label-text">Stock</span>
                  </label>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    type="numeric"
                    name="stock"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.stock}
                  />
                </div>
                {errors.stock && touched.stock && errors.stock}

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select className="select select-bordered" defaultValue={1}>
                    <option>Star Wars</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                  </select>
                </div>

                <div className="form-control">
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      placeholder="Add Category"
                      className="input input-bordered "
                    />
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="btn btn-square font-anek font-semibold text-white"
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

                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="price">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    disabled={!values.hasOptions}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn mt-10 text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
