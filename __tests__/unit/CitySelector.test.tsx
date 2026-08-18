import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySelector from "../../src/components/CitySelector";

const options = ["Stockholm", "London", "Paris", "Mumbai"];
const onSelectMockFunction = jest.fn();

describe("CitySelector", () => {
  test("renders a combobox with the correct label", () => {
    render(<CitySelector options={options} onSelect={onSelectMockFunction} />);
    expect(
      screen.getByRole("combobox", { name: /choose city/i }),
    ).toBeInTheDocument();
  });

  test("does not show any options before the dropdown is opened", () => {
    render(<CitySelector options={options} onSelect={onSelectMockFunction} />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  test("shows all provided options when the dropdown is opened", () => {
    render(<CitySelector options={options} onSelect={onSelectMockFunction} />);
    const combobox = screen.getByRole("combobox", { name: /choose city/i });

    fireEvent.mouseDown(combobox); 

    const renderedOptions = screen.getAllByRole("option");
    expect(renderedOptions).toHaveLength(options.length);
    expect(renderedOptions.map((el) => el.textContent)).toEqual(options);
  });

  test("calls onSelect with the chosen city when an option is clicked", () => {
    render(<CitySelector options={options} onSelect={onSelectMockFunction} />);
    const combobox = screen.getByRole("combobox", { name: /choose city/i });

    fireEvent.mouseDown(combobox);
    fireEvent.click(screen.getByRole("option", { name: "Paris" }));

    expect(onSelectMockFunction).toHaveBeenCalledWith("Paris");
    expect(combobox).toHaveValue("Paris");
  });

  test("filters the option list as the user types", async () => {
    const user = userEvent.setup();
    render(<CitySelector options={options} onSelect={onSelectMockFunction} />);
    const combobox = screen.getByRole("combobox", { name: /choose city/i });

    await user.type(combobox, "Lon"); // event: realistic keystroke-by-keystroke typing

    expect(screen.getByRole("option", { name: "London" })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Paris" }),
    ).not.toBeInTheDocument();
  });

  test("clears the field when Escape is pressed after a selection", () => {
    render(<CitySelector options={options} onSelect={onSelectMockFunction} />);
    const combobox = screen.getByRole("combobox", { name: /choose city/i });

    fireEvent.mouseDown(combobox);
    fireEvent.click(screen.getByRole("option", { name: "Stockholm" }));
    expect(combobox).toHaveValue("Stockholm");

    fireEvent.keyDown(combobox, { key: "Escape", code: "Escape" });

    expect(combobox).toHaveValue("");
  });
});
