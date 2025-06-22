import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";
import themeReducer from "./themeSlice";
import profileReducer from './profileSlice'
const store = configureStore({
  reducer: { auth: authReducer, expenses: expenseReducer, theme: themeReducer,profile:profileReducer },
});
export default store;
