import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../src/App";

describe("App", () => {
  test("does not include a city name in the document title by default", () => {
    render(<App />);
    expect(document.title).toBe("Weather App");
  });


  test("should display the correct title caption", () => {
    render(<App />);
    expect(
      screen.getByText(
        /Search a city and fetch live weather from Open-Meteo./i,
      ),
    ).toBeInTheDocument();
  });

  test("should display input field", () => {
    render(<App />);
    expect(screen.getByLabelText(/Please enter a city/i)).toBeInTheDocument();
  });

  test("should display search button", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  
});
