import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";

describe("Footer", () => {
  test("renders a semantic <footer> landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("renders attribution text mentioning Open-Meteo", () => {
    render(<Footer />);
    expect(screen.getByText(/weather data provided by/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open-meteo/i }),
    ).toBeInTheDocument();
  });
});