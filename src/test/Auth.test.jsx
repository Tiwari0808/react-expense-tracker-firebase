import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store/store";
import SignUp from "../components/SignUp";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("testing Login and signUp page", () => {
  test('renders Login form by default with "Login" header and "Login" button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );
    const testHeader = screen.getByText("Login", { selector: ".card-title" });
    expect(testHeader).toBeInTheDocument();
    const loginBtn = screen.getByRole("button", { name: "Login" });
    expect(loginBtn).toBeInTheDocument();
    const signupBtn = screen.getByRole("button", {
      name: "Do not have an account? Sign Up",
    });
    expect(signupBtn).toBeInTheDocument();
  });

  test("testing SignUp page with Sign Up header and Sign Up btn", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );
    const signupbtn = screen.getByRole("button", {
      name: "Do not have an account? Sign Up",
    });
    expect(signupbtn).toBeInTheDocument();
    await userEvent.click(signupbtn);
    screen.debug();
    const signUpHeader = await screen.findByText('Sign Up',{selector:'.card-title'});
    expect(signUpHeader).toBeInTheDocument();
    const signUpBtn = screen.getByRole('button',{name:'Sign Up'});
    expect(signUpBtn).toBeInTheDocument();
  });
});
