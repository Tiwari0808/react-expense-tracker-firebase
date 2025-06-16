import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { expect, test, vi } from "vitest";
import HomePage from "../pages/HomePage";
import { ToastContainer } from "react-toastify";
import store from "../store/store";
import userEvent from "@testing-library/user-event";
import { testStore } from "./testutils";
import { configureStore } from "@reduxjs/toolkit";
vi.mock("axios");
vi.fn();

test("displays error toast with error message", async () => {
  axios.get.mockRejectedValueOnce(new Error("Network Error"));
  render(
    <Provider store={store}>
      <HomePage />
      <ToastContainer />
    </Provider>
  );
  const toastError = await screen.findByText(/Failed to load expenses/i);
  expect(toastError).toBeInTheDocument();
});

test("successfully adds new expense", async () => {
  const mockRes = { data: { name: "expense123" } };
  axios.post.mockResolvedValueOnce(mockRes);
  const user = userEvent.setup();
  render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
  await user.type(screen.getByLabelText(/Amount/i), "500");
  await user.type(screen.getByLabelText(/Description/i), "Food");
  await user.click(screen.getByText(/Add Expense/i));
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      amount: "500",
      description: "Food",
      category: "Food",
    });
  });
});

test('deletes expense successfully', async () => {
  axios.delete.mockResolvedValueOnce({ status: 200 });
  const user = userEvent.setup();
  const mockExpenses = [{ id: 'exp1', amount: '100', description: 'Test', category: 'Food' }];
  
  render(
    <Provider store={testStore({
      expenses: { expenses: mockExpenses, totalAmount: 100, isPremium: false }
    })}>
      <HomePage />
    </Provider>
  );

  await user.click(screen.getByText('Delete'));
  expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/exp1.json'));
});

test('activates premium features when clicked', async () => {
  const user = userEvent.setup();

  render(
    <Provider store={testStore({
      expenses: { isPremium: true, isPremiumActive: false }
    })}>
      <HomePage />
    </Provider>
  );

  await user.click(screen.getByText('Activate Premium'));

  // Now test the visible effect of premium activation
  expect(screen.getByText(/Premium Features Active/i)).toBeInTheDocument();
})