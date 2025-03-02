import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterModal from "../../components/FilterModal";

describe("FilterModal Component", () => {
  const mockCurrentFilters = {
    species: "",
    gender: "",
    status: "",
  };

  const mockOnClose = vi.fn();
  const mockOnApply = vi.fn();

  it("renders filter options correctly", () => {
    render(
      <FilterModal
        currentFilters={mockCurrentFilters}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />
    );

    // Check if filter categories are displayed
    expect(screen.getByText("Especie")).toBeInTheDocument();
    expect(screen.getByText("Género")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();

    // Check if species options are displayed
    expect(screen.getByText("Humano")).toBeInTheDocument();
    expect(screen.getByText("Alien")).toBeInTheDocument();

    // Check if gender options are displayed
    expect(screen.getByText("Masculino")).toBeInTheDocument();
    expect(screen.getByText("Femenino")).toBeInTheDocument();

    // Check if status options are displayed
    expect(screen.getByText("Vivo")).toBeInTheDocument();
    expect(screen.getByText("Muerto")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <FilterModal
        currentFilters={mockCurrentFilters}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />
    );

    // Click the close button (using the FaTimes icon)
    const closeButtons = screen.getAllByRole("button");
    const closeButton = closeButtons.find(
      (button) => !button.textContent || button.textContent === ""
    );
    fireEvent.click(closeButton);

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onApply with updated filters when apply button is clicked", () => {
    render(
      <FilterModal
        currentFilters={mockCurrentFilters}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />
    );

    // Click a species filter
    fireEvent.click(screen.getByText("Humano"));

    // Click the apply button
    fireEvent.click(screen.getByText("Aplicar filtros"));

    // Check if onApply was called with the updated filters
    expect(mockOnApply).toHaveBeenCalledWith({
      species: "Human",
      gender: "",
      status: "",
    });
  });

  it("clears all filters when clear button is clicked", () => {
    render(
      <FilterModal
        currentFilters={{ species: "Human", gender: "Male", status: "Alive" }}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />
    );

    // Click the clear filters button
    fireEvent.click(screen.getByText("Limpiar filtros"));

    // Click the apply button
    fireEvent.click(screen.getByText("Aplicar filtros"));

    // Check if onApply was called with empty filters
    expect(mockOnApply).toHaveBeenCalledWith({
      species: "",
      gender: "",
      status: "",
    });
  });
});
