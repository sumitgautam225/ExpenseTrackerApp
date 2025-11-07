# Project Overview

This repository contains a full-stack finance tracker with a Node/Express backend and a Vite/React frontend.

- Backend: [backend/server.js](backend/server.js) — Express server and API entry point.
- Frontend: [frontend/src/App.jsx](frontend/src/App.jsx) — React app root.

See individual READMEs:
- [backend/README.md](backend/README.md)
- [frontend/README.md](frontend/README.md)

# Backend — Finance Tracker

This folder implements the REST API that the frontend consumes.

Quick links to files and symbols:
- Server: [backend/server.js](backend/server.js)
- Environment: [backend/.env](backend/.env)
- Package: [backend/package.json](backend/package.json)
- DB config & connection: [`config.db`](backend/config/db.js) — [backend/config/db.js](backend/config/db.js)

Controllers:
- [`authController.register`](backend/controllers/authController.js) — [backend/controllers/authController.js](backend/controllers/authController.js)
- [`authController.login`](backend/controllers/authController.js) — [backend/controllers/authController.js](backend/controllers/authController.js)
- [`dashboardController.getDashboard`](backend/controllers/dashboardController.js) — [backend/controllers/dashboardController.js](backend/controllers/dashboardController.js)
- [`expenseController.createExpense`](backend/controllers/expenseController.js) — [backend/controllers/expenseController.js](backend/controllers/expenseController.js)
- [`expenseController.getExpenses`](backend/controllers/expenseController.js) — [backend/controllers/expenseController.js](backend/controllers/expenseController.js)
- [`incomeController.createIncome`](backend/controllers/incomeController.js) — [backend/controllers/incomeController.js](backend/controllers/incomeController.js)
- [`incomeController.getIncomes`](backend/controllers/incomeController.js) — [backend/controllers/incomeController.js](backend/controllers/incomeController.js)

Middleware:
- [`authMiddleware.verifyToken`](backend/middleware/authMiddleware.js) — [backend/middleware/authMiddleware.js](backend/middleware/authMiddleware.js)
- [`uploadMiddleware.uploadFile`](backend/middleware/uploadMiddleware.js) — [backend/middleware/uploadMiddleware.js](backend/middleware/uploadMiddleware.js)

Models:
- [`Expense`](backend/models/Expense.js) — [backend/models/Expense.js](backend/models/Expense.js)
- [`Income`](backend/models/Income.js) — [backend/models/Income.js](backend/models/Income.js)
- [`User`](backend/models/User.js) — [backend/models/User.js](backend/models/User.js)

Routes:
- [backend/routes/authRoutes.js](backend/routes/authRoutes.js)
- [backend/routes/dashboardRoutes.js](backend/routes/dashboardRoutes.js)
- [backend/routes/expenseRoutes.js](backend/routes/expenseRoutes.js)
- [backend/routes/incomeRoutes.js](backend/routes/incomeRoutes.js)

Uploads folder:
- [backend/uploads/](backend/uploads/)

## Setup

1. Copy and configure environment variables:
   - Edit [backend/.env](backend/.env) with your MongoDB URI, JWT secret, and other values.

2. Install dependencies:
```sh
cd backend
npm install
```

3. Run the server:
- Development:
```sh
npm run dev
```
- Production:
```sh
npm start
```

The server runs from [backend/server.js](backend/server.js). It connects using [`config.db`](backend/config/db.js) and mounts routes from [backend/routes/*.js](backend/routes/).

## API Overview

Authentication:
- POST /api/auth/register -> handled by [`authController.register`](backend/controllers/authController.js)
- POST /api/auth/login -> handled by [`authController.login`](backend/controllers/authController.js)

Dashboard:
- GET /api/dashboard -> handled by [`dashboardController.getDashboard`](backend/controllers/dashboardController.js); protected by [`authMiddleware.verifyToken`](backend/middleware/authMiddleware.js)

Expenses:
- CRUD endpoints in [backend/routes/expenseRoutes.js](backend/routes/expenseRoutes.js) — controller refs in [`expenseController`](backend/controllers/expenseController.js)

Incomes:
- CRUD endpoints in [backend/routes/incomeRoutes.js](backend/routes/incomeRoutes.js) — controller refs in [`incomeController`](backend/controllers/incomeController.js)

File uploads:
- Upload middleware: [`uploadMiddleware.uploadFile`](backend/middleware/uploadMiddleware.js)
- Uploaded files saved in [backend/uploads/](backend/uploads/)

## Notes

- Models are in [backend/models/](backend/models/) — [`User`](backend/models/User.js), [`Expense`](backend/models/Expense.js), [`Income`](backend/models/Income.js).
- Routes are mounted in [backend/server.js](backend/server.js).
- Secure routes use [`authMiddleware.verifyToken`](backend/middleware/authMiddleware.js).

# Frontend — Finance Tracker (Vite + React)

Quick links:
- Project entry: [frontend/index.html](frontend/index.html)
- App root: [frontend/src/App.jsx](frontend/src/App.jsx)
- Styles: [frontend/src/index.css](frontend/src/index.css)
- Config: [frontend/vite.config.js](frontend/vite.config.js)
- Package: [frontend/package.json](frontend/package.json)
- ESLint: [frontend/eslint.config.js](frontend/eslint.config.js)
- Public assets: [frontend/public/](frontend/public/)
- Git ignore: [frontend/.gitignore](frontend/.gitignore)
- Existing README: [frontend/README.md](frontend/README.md)

## Setup & Run

1. Install dependencies:
```sh
cd frontend
npm install
```

2. Start dev server:
```sh
npm run dev
```

3. Build for production:
```sh
npm run build
```

4. Preview production build:
```sh
npm run preview
```

## How the frontend talks to the backend

- The React app in [frontend/src/App.jsx](frontend/src/App.jsx) sends API requests to the backend endpoints (see backend README).
- Update base URLs or proxy settings in [frontend/vite.config.js](frontend/vite.config.js) or environment variables in [frontend/package.json](frontend/package.json).

## Core Files

- [frontend/src/App.jsx](frontend/src/App.jsx): Root React component and route setup.
- [frontend/src/index.css](frontend/src/index.css): Global styles.
- [frontend/index.html](frontend/index.html): HTML entry.
- [frontend/public/](frontend/public/): Static assets.

## Typical Workflow

- Start backend server (see [backend/README.md](backend/README.md)).
- Start frontend dev server (`npm run dev` in [frontend/](frontend)).
- Use the app in the browser to register/login, add incomes/expenses, and view the dashboard.

## Troubleshooting

- CORS or proxy issues: check [frontend/vite.config.js](frontend/vite.config.js) and [backend/server.js](backend/server.js).
- Auth errors: inspect [`authController`](backend/controllers/authController.js) and [`authMiddleware.verifyToken`](backend/middleware/authMiddleware.js).
