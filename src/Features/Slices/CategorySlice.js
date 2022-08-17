import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url =
  "https://utak-react-test-ca736-default-rtdb.asia-southeast1.firebasedatabase.app/category";

export const addCategoryAPI = createAsyncThunk(
  "category/add",
  async (payload, thunkAPI) => {
    console.log("REGISTER THUNK LUL");
    try {
      const res = await axios.post(`${url}.json`, {
        categoryName: payload.categoryName,
      });

      return { categoryID: res.data.name, categoryName: payload.categoryName };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCategoryAPI = createAsyncThunk(
  "category/get",
  async (payload, thunkAPI) => {
    console.log("GET THUNK LUL");
    try {
      const res = await axios.get(`${url}.json`);
      let filteredData = [];
      for (const x in res.data) {
        filteredData.push({ ...res.data[x], categoryID: x.toString() });
      }
      return filteredData;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteCategoryAPI = createAsyncThunk(
  "category/delete",
  async (payload, thunkAPI) => {
    console.log("REGISTER THUNK LUL");
    const { categoryID } = payload;
    try {
      const res = await axios.delete(`${url}/${categoryID}.json`);
      return categoryID;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    addCategory: (state, action) => {
      console.log("category slice");
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAPI.pending, (state) => {
        console.log("pending request");
        state.isLoading = true;
      })
      .addCase(addCategoryAPI.fulfilled, (state, action) => {
        console.log("CATEGORY API");
        toast.info("Category Added Successfully");
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategoryAPI.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(getCategoryAPI.pending, (state) => {
        console.log("pending request");
        state.isLoading = true;
      })
      .addCase(getCategoryAPI.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategoryAPI.rejected, (state, action) => {
        console.log("get category error");
        state.categories = [];
        state.isLoading = true;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(deleteCategoryAPI.pending, (state) => {
        console.log("pending request");
        state.isLoading = true;
      })
      .addCase(deleteCategoryAPI.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.categoryID !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteCategoryAPI.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
