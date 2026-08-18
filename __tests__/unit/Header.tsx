import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Header";

describe("Header", () => {
  test("renders the default title as a level-1 heading", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { level: 1, name: /weather lookup/i }),
    ).toBeInTheDocument();
  });

  test("renders the default subtitle", () => {
    render(<Header />);
    expect(
      screen.getByText(/search a city and fetch live weather from open-meteo/i),
    ).toBeInTheDocument();
  });

  test("renders the default helper text", () => {
    render(<Header />);
    expect(
      screen.getByText(
        /choose a city from the list or type one manually and press search/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders a semantic <header> landmark", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("renders a custom title when provided", () => {
    render(<Header title="Custom Title" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Custom Title" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/weather lookup/i)).not.toBeInTheDocument();
  });

  test("renders a custom subtitle and helper text when provided", () => {
    render(
      <Header subtitle="Custom subtitle" helperText="Custom helper text" />,
    );
    expect(screen.getByText("Custom subtitle")).toBeInTheDocument();
    expect(screen.getByText("Custom helper text")).toBeInTheDocument();
  });
});
