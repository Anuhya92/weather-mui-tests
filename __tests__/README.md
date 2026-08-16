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

