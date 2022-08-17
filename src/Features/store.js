import { createReducer, configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./Slices/CategorySlice";
import ProductSlice from "./Slices/ProductSlice";

export const store = configureStore({
  reducer: { product: ProductSlice, category: CategorySlice },
});
