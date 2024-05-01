import React from "react";
import { render } from "@testing-library/react";
import TrainerProgressTrackPage from "../pages/TrainerProgressTrackPage";

describe("TrainerProgressTrackPage Component", () => {
  it("renders page title", () => {
    const { getByText } = render(<TrainerProgressTrackPage />);
    expect(getByText("Trainer Progress Track")).toBeInTheDocument();
  });

  it("renders loading message while fetching data", () => {
    const { getByText } = render(<TrainerProgressTrackPage />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message if fetching courses fails", () => {
    // Mocking the useAuth hook to return an error state
    jest.mock("../context/AuthContext", () => ({
      useAuth: () => ({
        state: {
          isAuthenticated: true,
          user: { uid: "trainerId" },
        },
      }),
    }));

    const { getByText } = render(<TrainerProgressTrackPage />);
    expect(getByText("Error fetching trainer courses. Please try again.")).toBeInTheDocument();
  });

  it("renders course cards", () => {
    // Mocking the useAuth hook to return authenticated state with dummy data
    jest.mock("../context/AuthContext", () => ({
      useAuth: () => ({
        state: {
          isAuthenticated: true,
          user: { uid: "trainerId" },
        },
      }),
    }));

    // Mocking the fetchCoursesByTrainerId API function to return dummy data
    jest.mock("../services/api", () => ({
      fetchCoursesByTrainerId: async () => [
        { id: 1, courseName: "Course 1", description: "Description 1" },
        { id: 2, courseName: "Course 2", description: "Description 2" },
      ],
    }));

    const { getAllByTestId } = render(<TrainerProgressTrackPage />);
    const courseCards = getAllByTestId("progress-card");
    expect(courseCards.length).toBe(2);
  });

  it("renders 'No courses found' message if no courses are available", () => {
    // Mocking the useAuth hook to return authenticated state with dummy data
    jest.mock("../context/AuthContext", () => ({
      useAuth: () => ({
        state: {
          isAuthenticated: true,
          user: { uid: "trainerId" },
        },
      }),
    }));

    // Mocking the fetchCoursesByTrainerId API function to return an empty array
    jest.mock("../services/api", () => ({
      fetchCoursesByTrainerId: async () => [],
    }));

    const { getByText } = render(<TrainerProgressTrackPage />);
    expect(getByText("No courses found for this trainer.")).toBeInTheDocument();
  });

  // You can write additional test cases to verify other functionalities such as navigation to course details
});
