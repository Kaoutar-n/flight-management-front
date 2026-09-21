# ✈️ Bee Flights

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

> Fill in your actual stack.

- **Frontend:** `TODO` (e.g. Angular / React)
- **Backend:** `TODO` (e.g. Spring Boot / ASP.NET Core)
- **Database:** `TODO`
- **Charts:** Chart.js (dashboard)
- **Auth:** `TODO` (e.g. JWT + e-mail validation code)

## Getting started

### Prerequisites

- `TODO` (Node.js, JDK / .NET SDK, database…)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Backend
cd backend
# TODO: install and run commands

# Frontend
cd ../frontend
# TODO: install and run commands
```

### Configuration

Create a config / `.env` file with:

```
DB_URL=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
MAIL_HOST=
MAIL_USER=
MAIL_PASSWORD=
```

## Project structure

```
├── backend/
├── frontend/
└── docs/
    └── screenshots/
```

## Roadmap

- [ ] Round-trip and multi-city search
- [ ] Booking history for customers
- [ ] Online payment
- [ ] Edit (not only add/delete) for flights, airports and airplanes
- [ ] Real data for dashboard statistics

## Author

**Kaoutar** — [GitHub](https://github.com/<your-username>) · [LinkedIn](https://linkedin.com/in/<your-profile>)
