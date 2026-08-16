import { render, screen } from "@testing-library/react";
import WeatherCard from "../../src/components/WeatherCard";
import { WeatherData } from "../../src/types";

const buildWeather = (overrides: Partial<WeatherData> = {}): WeatherData => ({
  city: "London",
  temperature: 18,
  description: "Partly cloudy",
  emoji: "⛅",
  windspeed: 14,
  weathercode: 2,
  ...overrides,
});

describe("WeatherCard", () => {
  test("renders the city name as a level-2 heading", () => {
    render(<WeatherCard weather={buildWeather()} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /london/i }),
    ).toBeInTheDocument();
  });

  test("renders the temperature", () => {
    render(<WeatherCard weather={buildWeather({ temperature: 18 })} />);
    expect(screen.getByText("18°C")).toBeInTheDocument();
  });

  test("renders the weather description as a chip", () => {
    render(
      <WeatherCard weather={buildWeather({ description: "Partly cloudy" })} />,
    );
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
  });

  test("renders the wind speed with unit", () => {
    render(<WeatherCard weather={buildWeather({ windspeed: 14 })} />);
    expect(screen.getByText("14 km/h")).toBeInTheDocument();
  });

  test("renders the weather emoji", () => {
    render(<WeatherCard weather={buildWeather({ emoji: "⛅" })} />);
    expect(screen.getByText("⛅")).toBeInTheDocument();
  });

  test("does not render an alert, since the card is purely presentational", () => {
    render(<WeatherCard weather={buildWeather()} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("renders three heading elements per card (city, emoji, temperature use heading-level Typography)", () => {
    render(
      <>
        <WeatherCard
          weather={buildWeather({ city: "London", windspeed: 14 })}
        />
        <WeatherCard weather={buildWeather({ city: "Paris", windspeed: 9 })} />
      </>,
    );

    // getAllByRole: MUI's Typography renders variant="h2" as a real <h2>,
    // so each card contributes 3 headings (city name, emoji, temperature) -> 6 total for two cards.
    expect(screen.getAllByRole("heading")).toHaveLength(6);
    // Each city's name is still uniquely identifiable by its accessible name.
    expect(screen.getByRole("heading", { name: "London" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Paris" })).toBeInTheDocument();
    expect(screen.getAllByText(/km\/h/i)).toHaveLength(2);
  });

  test("still renders a usable card for an unrecognized weather code", () => {
    render(
      <WeatherCard
        weather={buildWeather({
          description: "Unknown",
          emoji: "❓",
          weathercode: 999,
        })}
      />,
    );
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByText("❓")).toBeInTheDocument();
  });
});
