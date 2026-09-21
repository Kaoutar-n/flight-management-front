# Bee Flights

A flight management and booking web application. Customers can search and book flights; administrators manage flights, airports and airplanes from a dedicated dashboard.

## Features

**Customer side**

- Registration with e-mail account validation (validation code)
- Login / logout
- Flight search: one-way trip, cabin class, departure, arrival, date
- Filters: transit amount (non-transit, 1 stop, 2+ stops), price range, flight class
- Flight details: schedule, duration, free baggage and cabin allowance, price per person (MAD)
- Booking form: passenger identity, contact details, passport, number of seats

**Admin side**

- Dashboard with statistics: flights booked per month, monthly revenue (MAD), flight status distribution (on-time / delayed / cancelled)
- Flights management: add, list, delete (number, times, base price, departure/arrival airports, seats, airplane, class, escale, baggage and cabin capacity)
- Airports management: add, list, delete, with pagination
- Airplanes management: add, list, delete (model, capacity, fabrication date)

## Screenshots

### Authentication

| Register                              | Account validation                                                    | Login                           |
| ------------------------------------- | --------------------------------------------------------------------- | ------------------------------- |
| ![Register](src/results/register.jpg) | ![Account validation](src/results/validation_du_compte_via_email.png) | ![Login](src/results/login.jpg) |

### Search & booking

![Home / flight search](src/results/page_d_acceuil.jpg)

![Booking form](src/results/reservation.jpg)

### Admin dashboard

![Dashboard](src/results/dashboard.jpg)

![Flights](src/results/flights_page.jpg)

![Airports](src/results/Page_Airports.jpg)

![Airplanes](src/results/airplanes_pages.jpg)

## Tech stack

- **Frontend:** React 18 + Vite + TypeScript
- **Backend:** Not included in this repository (frontend expects an API)
- **Database:** Not present / not applicable to this repo
- **Charts:** Chart.js (via `react-chartjs-2`)
- **Auth (frontend):** JWT stored in `localStorage` (`authToken`), decoded with `jwt-decode`

Major libraries (from `package.json`): `react`, `react-dom`, `vite`, `typescript`, `axios`, `bootstrap`, `sass`, `chart.js`, `react-chartjs-2`, `react-router-dom`, `jwt-decode`, `react-icons`.

## Getting started

### Prerequisites

- Node.js: required for the frontend (no `engines` field or explicit Node version found in the repo).

Dev tool versions declared in `package.json` (useful references):

- `vite` ^5.4.10
- `typescript` ~5.6.2
- `@vitejs/plugin-react` ^4.3.3

Note: The repository does not include a backend service, JDK/.NET SDK, or database schema. Exact runtime versions for Node, backend framework, or database are not specified in the codebase.

### Installation

This repository contains the frontend application. To run the frontend from this repo root (folder name: `flight-management-front`):

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd flight-management-front
npm install
npm run dev
```

- The frontend is a Vite app; the default dev server port is `5173` unless overridden in your environment or Vite config.
- The frontend expects a backend API at `http://localhost:8088/api/v1` by default (see [src/api/apiClient.ts](src/api/apiClient.ts#L1-L20)).

If you have a separate backend, start it on port `8088` or update the API base URL in `src/api/apiClient.ts`.

### Configuration

This frontend does not read any environment variables (no `process.env` usages found). The app's network configuration is hard-coded in the API client:

- API base URL: `http://localhost:8088/api/v1` (hard-coded in [src/api/apiClient.ts](src/api/apiClient.ts#L1-L20)).
- Auth token storage: localStorage key `authToken` (the app sets/reads this key; see `src/login/Login.tsx`).

If you prefer to configure the API URL via environment variables, you must update `src/api/apiClient.ts` to read from an env variable (not implemented in the current code).

## Project structure

Top-level files:

- `package.json` — frontend dependencies & scripts
- `vite.config.ts`, `tsconfig.json` — build/dev configuration

`src/` (main frontend source):

- `admin/` — admin pages and dashboard components (`AdminFlights.tsx`, `AdminAirport.tsx`, `AdminAirplanes.tsx`, etc.)
- `api/` — API client (`apiClient.ts`) that points to `http://localhost:8088/api/v1`
- `assets/` — static images and icons used by the UI
- `components/` — reusable UI components (Footer, NavBar, Search, etc.)
- `login/` — authentication UI (`Login.tsx`, `Register.tsx`, `ValidateAccount.tsx`)
- `mainHome/` — main customer-facing pages (booking, booking form, profile, topbar)
- `results/` — screenshots used in the README (`*.jpg`, `*.png`)
- `styles/` — CSS / SCSS files
- top-level React entry points: `App.tsx`, `main.tsx`, `Presentation.tsx`

Files of interest:

- [src/api/apiClient.ts](src/api/apiClient.ts#L1-L20) — API base URL is hard-coded here.
- [src/login/Login.tsx](src/login/Login.tsx#L1-L120) — login flow, stores JWT in `localStorage`.
- [package.json](package.json#L1-L200) — dependency versions and npm scripts.

## Roadmap

- [ ] Round-trip and multi-city search
- [ ] Booking history for customers
- [ ] Online payment
- [ ] Edit (not only add/delete) for flights, airports and airplanes
- [ ] Real data for dashboard statistics

## Author

**Kaoutar** — [GitHub](https://github.com/<your-username>) · [LinkedIn](https://linkedin.com/in/<your-profile>)

---

What I couldn't confirm from the repository:

- Backend framework and code (no backend folder present in this repo).
- Database type, schema or connection details (not present in frontend repo).
- Exact Node.js runtime version required (no `engines` field).
- Any mail server, JWT secret, database credentials or other backend environment variables — those are backend responsibilities and are not present here.

Hard-coded values / potential credentials to review:

- API base URL is hard-coded in `src/api/apiClient.ts` as `http://localhost:8088/api/v1`.
- No plaintext secrets or credentials found in the frontend source.

If you'd like, I can:

- Extract the API base URL into an environment variable and update `src/api/apiClient.ts`.
- Add a short `backend/README.md` template describing the expected backend endpoints and environment variables.
