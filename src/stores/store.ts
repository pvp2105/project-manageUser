import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice";
import tableSlice from "../reducers/tableSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    userReducer: userSlice,
    tableReducer: tableSlice,
  },
});

export type IAppStateRedux = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<IAppStateRedux> = useSelector

export default store

