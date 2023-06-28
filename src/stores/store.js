import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice";

export default configureStore({
  reducer: {
    userReducer: userSlice,
  },
});

//configureStore: Tự động kết hợp tất cả các reducer được định nghĩa trong
