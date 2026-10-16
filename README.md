For this testing exercise, the proposal is a weather lookup app built with Next.js and Material UI (MUI). A user can search for a city, fetch live weather data from the Open-Meteo API, and view recent searches. This submission contains the proposal and behavioral tests; the application components are intentionally left for the developer implementing the tests.

## Run the Next.js scaffold

Run `npm install`, then `npm run dev` to start the Next.js scaffold. Run the test suite with `npm test`.

## The app's structure:

- App — the container. Holds the search input and button, calls Open-Meteo's geocoding API to resolve a city name to coordinates, then calls the forecast API to get weather data, manages loading/error/recent-searches state, and updates the browser tab title. The tests describe this behavior; the implementation is not part of this test-only submission.

- Header — presentational title block (page heading, subtitle, helper text). Accepts optional title/subtitle/helperText props so it's reusable elsewhere, but defaults to the app's original copy.

- Footer — presentational attribution/copyright block, rendered at the bottom of the page. Links to Open-Meteo and shows a copyright line with the current year (overridable via a year prop).

- CitySelector — an MUI Autocomplete combobox for picking a city from a known list, with typeahead filtering.

- RecentSearches — shows the last 5 successfully searched cities as clickable chips. Clicking a chip refills the search input via the onSelect callback. Renders nothing when the list is empty.

- WeatherCard — a purely presentational component that displays one city's weather (temperature, description, wind speed, emoji), given a weather object as a prop.


# Tests

This directory contains unit tests and integration tests for the weather app.

## Structure

- `__tests__/` - Contains all test files for the application

## Setup

Run script `npm install` in project root directory, where **package.json** exists

## Running Tests

To run all tests (unit + integration):

```bash
npm run test
```

## React Testing Library commands
Used the following commands to extract the content for assertions
 - getByRole
 - getByText 
 - getByLabelText
 - getByPlaceholderText
 - getAllByRole
 - queryAllByRole
 - render
 - fireEvent -> used to trigger actions like click on a button
 - userEvent -> used to trigger keydown event in an input field

 ## Jest important functions
 - Jest.fn -> used to mock function that does api call to fetch weather forecast information

