import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url =
  "https://utak-react-test-ca736-default-rtdb.asia-southeast1.firebasedatabase.app/category";

export const addCategoryAPI = createAsyncThunk(
  "category/add",
  async (payload, thunkAPI) => {
    try {
      const currCategories = thunkAPI.getState().category.categories;

      if (
        currCategories.find(
          (category) =>
            category.categoryName.toLowerCase() ==
            payload.categoryName.toLowerCase().trim()
        )
      ) {
        throw new Error("Existing Category Found");
      }

      const res = await axios.post(`${url}.json`, {
        categoryName: payload.categoryName.trim(),
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
    const { categoryID } = payload;
    try {
      const res = await axios.delete(`${url}/${categoryID}.json`);
      return categoryID;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editCategoryAPI = createAsyncThunk(
  "category/edit",
  async (payload, thunkAPI) => {
    const { categoryID, categoryName } = payload;
    try {
      const res = await axios.put(`${url}/${categoryID}.json`, {
        categoryName: categoryName,
      });
      return payload;
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
    isDeleteLoading: false,
  },
  reducers: {
    addCategory: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategoryAPI.fulfilled, (state, action) => {
        toast.info("Category Added Successfully");
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategoryAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(getCategoryAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryAPI.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategoryAPI.rejected, (state, action) => {
        state.categories = [];
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(deleteCategoryAPI.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteCategoryAPI.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.categoryID !== action.payload
        );
        state.isDeleteLoading = false;
      })
      .addCase(deleteCategoryAPI.rejected, (state, action) => {
        state.isDeleteLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(editCategoryAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategoryAPI.fulfilled, (state, action) => {
        let index = state.categories.findIndex(
          (category) => category.categoryID == action.payload.categoryID
        );
        state.categories[index] = {
          categoryID: action.payload.categoryID,
          categoryName: action.payload.categoryName,
        };
        state.isLoading = false;
      })
      .addCase(editCategoryAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      });
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
