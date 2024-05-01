import React from "react";
import { render } from "@testing-library/react";
import TrackProgressPage from "../pages/TrackProgressPage";

describe("TrackProgressPage Component", () => {
  it("renders course name", () => {
    const { getByText } = render(<TrackProgressPage />);
    expect(getByText("Enrolled Students for")).toBeInTheDocument();
  });

  it("renders search input", () => {
    const { getByPlaceholderText } = render(<TrackProgressPage />);
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders sorting select", () => {
    const { getByText } = render(<TrackProgressPage />);
    expect(getByText("Sort by Enrollment Date")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    const { getByText } = render(<TrackProgressPage />);
    expect(getByText("ID")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Region")).toBeInTheDocument();
    expect(getByText("Enrollment Date")).toBeInTheDocument();
    expect(getByText("Status")).toBeInTheDocument();
  });

  // You can write additional test cases to verify the rendering of student data and sorting functionality
});
