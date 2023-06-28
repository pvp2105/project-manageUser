import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  emailHeader: "",
  password: "",
  isShowPassword: false,
  loadingApi: false,
};

const UserSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    getEmail: (state, action) => {
      state.email = action.payload;
    },
    getEmailHeader: (state, action) => {
      state.emailHeader = action.payload;
    },
    getPassword: (state, action) => {
      state.password = action.payload;
    },
    getShowPassword: (state, action) => {
      state.isShowPassword = action.payload;
    },
    getLoadingApi: (state, action) => {
      state.loadingApi = action.payload;
    },
  },
});

export const {
  getEmail,
  getEmailHeader,
  getPassword,
  getShowPassword,
  getLoadingApi,
} = UserSlice.actions;

export default UserSlice.reducer;
