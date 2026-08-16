import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../src/App";

describe("App integration", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn((url: string) => {
      const endpoint = String(url);

      console.log("Mock fetch called with URL:", endpoint);
      if (endpoint.includes("forecast")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            current_weather: {
              temperature_2m: 22.5,
              apparent_temperature: 21.8,
              relative_humidity_2m: 52,
              wind_speed_10m: 12.4,
              weather_code: 1,
            },
          }),
        });
      } else if (
        endpoint.includes("geocoding") &&
        endpoint.includes("InvalidCityName")
      ) {
        return Promise.resolve({
          ok: false,
          json: async () => ({ error: "City not found" }),
        });
      } else {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            results: [
              {
                name: "Stockholm",
                latitude: 59.3293,
                longitude: 18.0686,
              },
            ],
          }),
        });
      }
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should display an error when trying to fetch weather for an invalid city", async () => {
    render(<App />);

    // Enter an invalid city name
    const input = screen.getByLabelText(/Please enter a city/i);
    fireEvent.change(input, { target: { value: "InvalidCityName" } });
    expect(input).toHaveValue("InvalidCityName");

    const button = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/City not found/i)).toBeInTheDocument(),
    );
  });

  test("should not display an error when trying to fetch weather for a valid city", async () => {
    render(<App />);

    // Enter a valid city name
    const input = screen.getByLabelText(/Please enter a city/i);
    fireEvent.change(input, { target: { value: "Stockholm" } });
    expect(input).toHaveValue("Stockholm");

    const button = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.queryByText(/City not found/i)).not.toBeInTheDocument(),
    );
  });

  test("a successful search updates the document title to reflect the fetched city (side-effect state)", async () => {
    render(<App />);

    fireEvent.change(
      screen.getByRole("textbox", { name: /please enter a city/i }),
      {
        target: { value: "Stockholm" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => expect(document.title).toBe("Stockholm Weather"));
  });
});
