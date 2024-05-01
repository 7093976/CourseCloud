import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";

describe("LoginPage Component", () => {
  it("renders 'Login' header", () => {
    const { queryByText } = render(<LoginPage />);
    expect(queryByText("Login")).toBeInTheDocument();
  });

  it("renders email input field", () => {
    const { queryByLabelText } = render(<LoginPage />);
    expect(queryByLabelText("Email ID:")).toBeInTheDocument();
  });

  it("renders password input field", () => {
    const { queryByLabelText } = render(<LoginPage />);
    expect(queryByLabelText("Password:")).toBeInTheDocument();
  });

  it("renders 'Show' password toggle button", () => {
    const { queryByText } = render(<LoginPage />);
    expect(queryByText("Show")).toBeInTheDocument();
  });

  it("renders 'Login' button", () => {
    const { queryByText } = render(<LoginPage />);
    expect(queryByText("Login")).toBeInTheDocument();
  });

  it("renders 'Don't have an account?' link", () => {
    const { queryByText } = render(<LoginPage />);
    expect(queryByText("Don't have an account?")).toBeInTheDocument();
  });

  it("handles email input change", () => {
    const { queryByLabelText } = render(<LoginPage />);
    const emailInput = queryByLabelText("Email ID:");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("handles password input change", () => {
    const { queryByLabelText } = render(<LoginPage />);
    const passwordInput = queryByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility", async () => {
    const { queryByText, queryByLabelText } = render(<LoginPage />);
    const passwordInput = queryByLabelText("Password:");
    const toggleButton = queryByText("Show");
    fireEvent.click(toggleButton);
    await waitFor(() => expect(passwordInput.type).toBe("text"));
    fireEvent.click(toggleButton);
    await waitFor(() => expect(passwordInput.type).toBe("password"));
  });

  // Add more test cases as needed for form submission, error handling, etc.
});
