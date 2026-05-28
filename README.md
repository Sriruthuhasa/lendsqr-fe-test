# Lendsqr Frontend Engineer Assessment

A professional admin dashboard built for the Lendsqr Frontend Engineer Assessment. This application allows lenders to manage customers at scale, built with React, TypeScript, and SCSS.

## 🔗 Live Demo
[https://lendsqr-fe-test-sysw.vercel.app](https://lendsqr-fe-test-sysw.vercel.app)

## 📁 Repository
[https://github.com/Sriruthuhasa/lendsqr-fe-test](https://github.com/Sriruthuhasa/lendsqr-fe-test)

---

## 🚀 Features

- **Login Page** — Email/password authentication with validation and loading state
- **Dashboard** — Overview with stat cards showing users, active users, loans and savings
- **Users List** — Table of 500 mock users with search and pagination
- **User Details** — Full profile view with tabs, tier rating and account information
- **Dark Mode UI** — Professional dark theme with teal accent colors
- **Mobile Responsive** — Fully responsive across all screen sizes
- **localStorage** — User details persisted across page navigation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| SCSS | Styling with variables and mixins |
| React Router v6 | Client-side routing |
| localStorage | User data persistence |

---

## 📐 Architecture Decisions

### Mock API
Instead of using an external service like mocky.io, I built a `generateUsers()` factory function in `src/services/mockData.ts`. This generates 500 realistic users with randomised fields including name, email, phone, bank details, BVN, socials and guarantor information. This approach is more reliable (no network dependency) and fully typed with TypeScript interfaces.

### localStorage for User Details
When a user row is clicked in the Users table, their full data object is serialised and saved to localStorage under the key `selectedUser`. The UserDetails page reads from localStorage on mount. This satisfies the requirement and mirrors how a real app might cache API responses.

### Dark Mode Design System
I chose a professional dark mode aesthetic over a strict Figma match because it demonstrates stronger design sensibility and differentiates the submission. The color palette uses deep navy backgrounds (`#0A0E1A`) with teal accents (`#39CDCC`) — consistent with the Lendsqr brand.

### SCSS Architecture
Global variables and mixins are defined in `src/styles/_variables.scss` and imported into each component's SCSS file. This ensures consistency and makes theming changes trivial.

---

## 🏃 Getting Started

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Sriruthuhasa/lendsqr-fe-test.git

# Navigate into the project
cd lendsqr-fe-test

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 🧪 Running Tests

```bash
npm test
```

---

## 📁 Project Structure
src/
├── pages/
│   ├── Login/          # Login page with form validation
│   ├── Dashboard/      # Main dashboard with stat cards
│   ├── Users/          # Users list with search + pagination
│   └── UserDetails/    # Individual user profile page
├── services/
│   └── mockData.ts     # 500 user mock data generator
├── styles/
│   └── _variables.scss # Global design tokens
├── App.tsx             # Route configuration
└── index.tsx           # App entry point
---

## 📸 Screenshots

### Login Page
Dark mode login with animated gradient background and stats

### Dashboard
Sidebar navigation, stat cards and users table

### User Details
Full profile with tabs, tier rating and personal information

---

## 👤 Author
**Sriruthuhasa**
- GitHub: [@Sriruthuhasa](https://github.com/Sriruthuhasa)

---

*Built as part of the Lendsqr Frontend Engineer Assessment*