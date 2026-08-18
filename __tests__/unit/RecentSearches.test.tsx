import { render, screen, fireEvent } from "@testing-library/react";
import RecentSearches from "../../src/components/RecentSearches";

const onSelectMockFunction = jest.fn();

describe("RecentSearches", () => {
  afterEach(() => {
    onSelectMockFunction.mockClear();
  });

  test("renders nothing when there are no recent cities", () => {
    const { container } = render(
      <RecentSearches cities={[]} onSelect={onSelectMockFunction} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("does not render the 'Recent searches' label when the list is empty", () => {
    render(<RecentSearches cities={[]} onSelect={onSelectMockFunction} />);
    expect(screen.queryByText(/recent searches/i)).not.toBeInTheDocument();
  });
});
