import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Welcome from "../../pages/Welcome";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

describe("Welcome Page", () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // Reset the mock before each test
    mockNavigate.mockReset();
  });

  it("renders welcome page with correct elements", () => {
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    // Check if the title is displayed
    expect(screen.getByText("Bienvenido al multiverso")).toBeInTheDocument();

    // Check if the description is displayed
    expect(
      screen.getByText(
        /Explora todos los personajes del universo de Rick y Morty/
      )
    ).toBeInTheDocument();

    // Check if the button is displayed
    expect(screen.getByText("Comenzar aventura")).toBeInTheDocument();

    // Check if the copyright text is displayed
    expect(
      screen.getByText(
        "TM & © 2024 The Cartoon Network, Inc. All Rights Reserved."
      )
    ).toBeInTheDocument();
  });

  it("navigates to home page when button is clicked", () => {
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    // Click the start button
    fireEvent.click(screen.getByText("Comenzar aventura"));

    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});
