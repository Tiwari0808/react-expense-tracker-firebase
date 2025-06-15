import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from '../store/expenseSlice';
import authReducer from '../store/authSlice';
import themeReducer from '../store/themeSlice'

export function testStore(preloadedState) {
  return configureStore({
    reducer: {
      expenses: expenseReducer,
      auth: authReducer,
      theme:themeReducer
    },
    preloadedState,
  });
}
