import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import store from "../store/store";
import { describe, expect, test } from "vitest";
import { testStore } from "./testutils";
import ThemeToggle from "../components/ThemeToggle";
import userEvent from "@testing-library/user-event";
import MainNavbar from '../components/MainNavbar'
import expenseReducer from '../store/expenseSlice'

describe("testing home page", () => {
  test("testing expense form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    const expenseHeader = screen.getByText("Add Daily Expense");
    expect(expenseHeader).toBeInTheDocument();
  });
  test("tests the premium button visibility when expense exceeds 10 k", () => {
    const mockData = {
      expenses: {
        expenses: [
          {
            id: "1",
            amount: 15000,
            description: "smartphone",
            category: "electronics",
          },
        ],
        totalAmount: 15000,
        isPremium: true,
      },
      auth: { isLoggedIn: true },
    };
    render(
      <Provider store={testStore(mockData)}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    screen.debug();
    expect(
      screen.getByRole("button", { name: "Activate Premium" })
    ).toBeInTheDocument();
  });

  test("renders theme toggle button", () => {
    const mockData = {
      expenses: {
        expenses: [{ id: "1", amount: 15000 }],
        totalAmount: 15000,
        isPremium: true,
        isPremiumActive: true,
      },
      auth: { isLoggedIn: true },
      theme: { isDarkTheme: false },
    };
    render(
      <Provider store={testStore(mockData)}>
        <ThemeToggle />
      </Provider>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

test("toggles between light and dark mode", async () => {
  const user = userEvent.setup();

  const mockData = {
    expenses: {
      isPremiumActive: true,
    },
    theme: {
      isDarkTheme: false,
    },
  };

  render(
    <Provider store={testStore(mockData)}>
      <ThemeToggle />
    </Provider>
  );

  const toggleBtn = screen.getByRole("button");
  expect(toggleBtn.textContent).toMatch(/Dark Mode/i);
  await user.click(toggleBtn);
  expect(toggleBtn.textContent).toMatch(/Light Mode/i);
});

test('renders navigation links', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainNavbar/>
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText('Expense-Tracker')).toBeInTheDocument();
});

test('shows logout when authenticated', () => {
  const mockState = { auth: { isLoggedIn: true } };
  
  render(
    <Provider store={testStore(mockState)}>
      <BrowserRouter>
        <MainNavbar />
      </BrowserRouter>
    </Provider>
  );
  
  expect(screen.getByText('Logout')).toBeInTheDocument();
});

test('should handle initial state', () => {
  expect(expenseReducer(undefined, {})).toEqual({
    expenses: [],
    totalAmount: 0,
    isPremium: false,
    isPremiumActive: false
  });
});

test('should handle addExpense', () => {
  const action = {
    type: 'expense/addExpense',
    payload: { id: '1', amount: '100', description: 'Test', category: 'Food' }
  };
  const state = expenseReducer(undefined, action);
  expect(state.expenses.length).toBe(1);
  expect(state.totalAmount).toBe(100);
});