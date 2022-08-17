import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const url =
  "https://utak-react-test-ca736-default-rtdb.asia-southeast1.firebasedatabase.app/products";

export const addProductAPI = createAsyncThunk(
  "product/add",
  async (payload, thunkAPI) => {
    console.log("REGISTER THUNK LUL");
    try {
      const res = await axios.post(`${url}.json`, {
        ...payload,
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAPI.pending, (state) => {
        console.log("pending request");
      })
      .addCase(addProductAPI.fulfilled, (state, action) => {
        console.log("PRODUCT API");
        console.log("successful request");
        console.log(action.payload);
        toast.info("Product Added Successfully");

        //router.push("/");
      })
      .addCase(addProductAPI.rejected, (state, action) => {
        toast.error("Failed to add a category.");
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import React from "react";
// import { toast } from "react-toastify";
// import AuthService from "./AuthService";

// //import { useRouter } from "next/router";
// //const router = useRouter();
// let user;

// if (typeof window !== "undefined") {
//   user = JSON.parse(localStorage.getItem("user"));
//   // localStorage.setItem(key, value);
// }
// export const register = createAsyncThunk(
//   "auth/register",
//   async (payload, thunkAPI) => {
//     console.log("REGISTER THUNK LUL");
//     try {
//       const res = await axios.post("/api/auth", {
//         name: payload.name,
//         email: payload.email,
//         password: payload.password,
//         username: payload.username,
//       });
//       localStorage.setItem("user", JSON.stringify(res.data));
//       return res.data;
//     } catch (e) {
//       console.log(e);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "auth/login",
//   async (payload, thunkAPI) => {
//     console.log("LOGIN THUNK LUL");
//     try {
//       const res = await axios.post("/api/auth/login", {
//         email: payload.email,
//         password: payload.password,
//       });

//       localStorage.setItem("user", JSON.stringify(res.data));
//       console.log("LOGIN RES: ");
//       console.log(res.data);
//       return res.data;
//     } catch (e) {
//       console.log(e);
//     }
//   }
// );

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await AuthService.logout();
// });

// const initialState = {
//   isLoading: false,
//   user: user ? user : null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     // logout: (state, action) => {
//     //   console.log(">>>>>>>>>>logout called");
//     //   //localStorage.removeItem("user");
//     //   state.user = null;
//     // },
//     // reset: (state) => {
//     //   state.isLoading = false;
//     //   state.isError = false;
//     //   state.isSuccess = false;
//     //   state.message = "";
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//         if (state.user) toast.info("Registration Successful.");
//         //router.push("/");
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       })
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//         //router.push("/");
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       })
//       .addCase(logout.fulfilled, (state, action) => {
//         state.user = null;
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = false;
//         state.message = "";
//         toast.info("Logout Successfully");
//       });
//   },
// });

// export const { reset } = authSlice.actions;
// export default authSlice.reducer;
