import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  totalAmount: 0,
  isPremium: false,
  isPremiumActive: false,
};
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    activatePremium(state) {
      state.isPremiumActive = true;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload),
        (state.totalAmount += Number(action.payload.amount)),
        (state.isPremium = state.totalAmount > 10000);
    },
    updateExpense(state, action) {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.totalAmount -= Number(state.expenses[index].amount);
        state.expenses[index] = action.payload;
        (state.totalAmount += Number(action.payload.amount)),
          (state.isPremium = state.totalAmount > 10000);
      }
    },
    deleteExpense(state, action) {
      const expense = state.expenses.find((exp) => exp.id === action.payload);
      if (expense) {
        state.totalAmount -= Number(expense.amount);
        state.expenses = state.expenses.filter(
          (exp) => exp.id !== action.payload
        );
        state.isPremium = state.totalAmount > 10000;
      }
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.totalAmount = action.payload.reduce(
        (acc, exp) => (acc += Number(exp.amount)),
        0
      );
      state.isPremium = state.totalAmount > 10000;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
