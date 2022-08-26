import {
  AnyAction,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { employeeSlice } from "./slices/employee.slice";
import { useDispatch } from "react-redux";

const makeStore = () =>
  configureStore({
    reducer: {
      [employeeSlice.name]: employeeSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore>;

//AppThunkDispatch Type
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

//Custom useDispatch hook with AppThunkDispatch type support
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

//Next Redux Wrapper
export const wrapper = createWrapper<AppStore>(makeStore);
