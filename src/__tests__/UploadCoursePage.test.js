import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import UploadCoursePage from "../pages/UploadCoursePage";

describe("UploadCoursePage Component", () => {
  it("renders form fields", () => {
    const { getByLabelText } = render(<UploadCoursePage />);
    expect(getByLabelText("Course Name:")).toBeInTheDocument();
    expect(getByLabelText("Description:")).toBeInTheDocument();
    expect(getByLabelText("Difficulty:")).toBeInTheDocument();
    expect(getByLabelText("Duration Hours:")).toBeInTheDocument();
  });

  it("submits the form with correct data", async () => {
    const { getByLabelText, getByText } = render(<UploadCoursePage />);

    fireEvent.change(getByLabelText("Course Name:"), {
      target: { value: "Test Course" },
    });
    fireEvent.change(getByLabelText("Description:"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(getByLabelText("Difficulty:"), {
      target: { value: "Intermediate" },
    });
    fireEvent.change(getByLabelText("Duration Hours:"), {
      target: { value: "10" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(getByText("Course uploaded successfully!")).toBeInTheDocument();
    });
  });

  it("displays error message if form submission fails", async () => {


    const { getByLabelText, getByText } = render(<UploadCoursePage />);

    fireEvent.change(getByLabelText("Course Name:"), {
      target: { value: "Test Course" },
    });
    fireEvent.change(getByLabelText("Description:"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(getByLabelText("Difficulty:"), {
      target: { value: "Intermediate" },
    });
    fireEvent.change(getByLabelText("Duration Hours:"), {
      target: { value: "10" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(getByText("Error uploading course: Server Error")).toBeInTheDocument();
    });
  });
});
