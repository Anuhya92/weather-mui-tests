For this testing exercise, I used an old project — a weather lookup app built with React and Material UI (MUI) — as the codebase . The app lets a user search for a city, fetches live weather data from the Open-Meteo API, and displays the result.

# The app's structure (3 main pieces):

- App — the container. Holds the search input and button, calls Open-Meteo's geocoding API to resolve a city name to           coordinates, then calls the forecast API to get weather data, manages loading/error state, and updates the browser tab title.

- CitySelector — an MUI Autocomplete combobox for picking a city from a known list, with typeahead filtering.

- WeatherCard — a purely presentational component that displays one city's weather (temperature, description, wind speed, emoji), given a weather object as a prop.

## Test structure


__tests__/
├── integration/
│   └── App.integration.test.tsx   # App + real fetch flow, mocked at the network boundary
└── unit/
    ├── App.test.tsx               # App's static/default UI, in isolation
    ├── CitySelector.test.tsx      # Autocomplete behavior in isolation
    └── WeatherCard.test.tsx       # Presentational rendering in isolation


- *Unit tests* : render a single component with controlled props/mocked callbacks and assert on its own behavior only.

- *Integration test* :  renders the real App (which composes the other components internally) and drives it exactly as a user would — typing, clicking — with only global.fetch mocked. This verifies the components actually work together, not just individually.


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

