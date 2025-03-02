import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CharacterCard from "../../components/CharacterCard";

describe("CharacterCard Component", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    location: { name: "Earth (C-137)" },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/1"],
  };

  const mockToggleFavorite = vi.fn();

  it("renders character information correctly", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
      />
    );

    // Check if character name is displayed
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();

    // Check if status is displayed (translated to Spanish)
    expect(screen.getByText("Vivo")).toBeInTheDocument();

    // Check if species is displayed (translated to Spanish)
    expect(screen.getByText("Humano")).toBeInTheDocument();

    // Check if location is displayed
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
  });

  it("displays favorite icon correctly when character is not favorited", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
      />
    );

    // Check if the non-favorite icon is displayed
    const starIcon = screen.getByRole("button").querySelector("svg");
    expect(starIcon).toBeInTheDocument();
  });

  it("displays favorite icon correctly when character is favorited", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={true}
        toggleFavorite={mockToggleFavorite}
      />
    );

    // Check if the favorite icon is displayed
    const starIcon = screen.getByRole("button").querySelector("svg");
    expect(starIcon).toBeInTheDocument();
  });

  it("calls toggleFavorite when favorite button is clicked", () => {
    const { getByRole } = render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
      />
    );

    // Click the favorite button
    getByRole("button").click();

    // Check if toggleFavorite was called with the correct character id
    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });
});
