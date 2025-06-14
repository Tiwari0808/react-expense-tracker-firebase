import { render, screen } from "@testing-library/react"
import HomePage from "../pages/HomePage"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import store from "../store/store"
import { describe, expect } from "vitest"

describe('testing home page',()=>{
test('testing expense form',()=>{
    render(
    <Provider store={store}>
        <MemoryRouter>
         <HomePage/>
        </MemoryRouter>
    </Provider>
    );
    const expenseHeader = screen.getByText('Add Daily Expense');
    expect(expenseHeader).toBeInTheDocument();
})
})
