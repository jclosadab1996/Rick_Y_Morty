import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer Component", () => {
  it("renders the footer with correct text", () => {
    render(<Footer />);

    // Check if the copyright text is displayed
    expect(
      screen.getByText(
        "TM & © 2024 The Cartoon Network, Inc. All Rights Reserved."
      )
    ).toBeInTheDocument();
  });

  it("has the correct styling classes", () => {
    const { container } = render(<Footer />);

    // Check if the footer has the correct styling classes
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-[#2a2a2a]");
    expect(footer).toHaveClass("text-white");
    expect(footer).toHaveClass("text-center");
    expect(footer).toHaveClass("border-t-4");
    expect(footer).toHaveClass("border-rick-green");
  });
});
