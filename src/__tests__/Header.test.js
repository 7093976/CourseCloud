import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  it("renders logo", () => {
    const { getByText } = render(<Header />, { wrapper: MemoryRouter });
    expect(getByText("CourseCloud 🌩️")).toBeInTheDocument();
  });

  it("renders navigation links correctly", () => {
    const { getByText } = render(<Header />, { wrapper: MemoryRouter });
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Courses")).toBeInTheDocument();
    expect(getByText("About")).toBeInTheDocument();
    // Add other static navigation links as necessary
  });
});
