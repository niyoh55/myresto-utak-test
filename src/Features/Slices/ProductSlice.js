import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const url =
  "https://utak-react-test-ca736-default-rtdb.asia-southeast1.firebasedatabase.app/products";

export const addProductAPI = createAsyncThunk(
  "product/add",
  async (payload, thunkAPI) => {
    const {
      productName,
      price,
      stock,
      cost,
      hasOptions,
      category,
      optionName,
      inputs,
      hasAddons,
      addOns,
    } = payload;

    let filteredVariations = inputs?.filter(
      (option) => option.variationName.length !== 0
    );
    let filteredAddons = addOns?.filter(
      (option) => option.addOnName.length !== 0
    );
    try {
      const res = await axios.post(`${url}.json`, {
        productName,
        price,
        stock,
        cost,
        hasOptions,
        category,
        optionName: hasOptions ? optionName : null,
        variations: hasOptions ? [...filteredVariations] : null,
        hasAddons,
        addOns: hasAddons ? [...filteredAddons] : null,
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getProductsAPI = createAsyncThunk(
  "products/get",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`${url}.json`);
      let filteredData = [];
      for (const x in res.data) {
        filteredData.push({ ...res.data[x], productID: x.toString() });
      }
      return filteredData;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteProductAPI = createAsyncThunk(
  "product/delete",
  async (payload, thunkAPI) => {
    const { productID } = payload;
    try {
      const res = await axios.delete(`${url}/${productID}.json`);
      return productID;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editProductAPI = createAsyncThunk(
  "product/edit",
  async (payload, thunkAPI) => {
    const {
      productName,
      price,
      stock,
      cost,
      hasOptions,
      category,
      optionName,
      inputs,
      hasAddons,
      addOns,
      productID,
    } = payload;

    let filteredVariations = inputs.filter(
      (option) => option.variationName.length !== 0
    );
    let filteredAddons = addOns.filter(
      (option) => option.addOnName.length !== 0
    );
    try {
      const res = await axios.put(`${url}/${productID}.json`, {
        productName,
        price,
        stock,
        cost,
        hasOptions,
        category,
        optionName,
        variations: [...filteredVariations],
        hasAddons,
        addOns: [...filteredAddons],
      });
      return payload;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
    isError: false,
    isDeleteLoading: false,
  },
  reducers: {
    addProduct: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.info("Product Added Successfully");
      })
      .addCase(addProductAPI.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to add a category.");
      })

      .addCase(getProductsAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsAPI.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductsAPI.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })

      .addCase(deleteProductAPI.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteProductAPI.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.productID !== action.payload
        );
        state.isDeleteLoading = false;
        toast.info("Product deleted.");
      })
      .addCase(deleteProductAPI.rejected, (state, action) => {
        state.isDeleteLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(editProductAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProductAPI.fulfilled, (state, action) => {
        let index = state.products.findIndex(
          (product) => product.productID == action.payload.productID
        );
        state.products[index] = {
          ...action.payload,
        };
        state.isLoading = false;
      })
      .addCase(editProductAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
