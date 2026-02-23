# Frontend

The frontend is the part of the application that users see and interact with in their web browser. It displays data, forms, and allows users to perform actions like uploading files or viewing station information.

## What is a Single Page Application (SPA)?

The frontend is built as a **Single Page Application (SPA)**. This means:
- The entire app loads once in your browser
- When you navigate between pages, the browser doesn't reload the whole page
- This makes the experience faster and smoother for users

## Technologies Used

We use several modern libraries to make development easier and the app more powerful:

### [React](https://react.dev/)
- **What it is:** A JavaScript library for building user interfaces
- **Why we use it:** Makes it easy to create interactive and reusable components
- **Language:** Written in TypeScript (a type-safe version of JavaScript)

### [Refine](https://refine.dev/)
- **What it is:** A React framework for building data-heavy applications
- **Why we use it:** Handles common tasks like:
  - Fetching data from the backend (API calls)
  - Managing forms for creating and editing data
  - Handling authentication (login/logout)
  - Routing (navigation between pages)

### [MUI (Material-UI) v6](https://v6.mui.com/material-ui/)
- **What it is:** A library of pre-built UI components
- **Why we use it:** Provides beautiful, accessible components like:
  - Buttons, text fields, and forms
  - Tables and data grids
  - Navigation menus and layouts
  - All following Google's Material Design principles

### [i18next](https://www.i18next.com/)
- **What it is:** An internationalization framework
- **Why we use it:** Allows the app to support multiple languages (currently English and French)
- **How it works:** All text is stored in translation files (`public/locales/en.json` and `fr.json`) so we can easily add new languages

## Project Structure

The frontend code is organized in the `src/` folder:

```
src/
├── app.tsx              # Main app entry point
├── main.tsx             # App initialization
├── auth/                # Authentication logic
├── core/                # Core components (layout, providers, routing)
├── dashboard/           # Dashboard page
├── datasets/            # Dataset management pages
├── instruments/         # Instrument pages
├── stations/            # Station pages
└── shared/              # Reusable components and utilities
```

## Development Commands

- **Start development server:** `yarn dev`
- **Build for production:** `yarn build`
- **Format code:** `yarn format`
- **Check for errors:** `yarn lint`

