# Expense Tracker Frontend

This is the frontend for the Expense Tracker application, built with Next.js 13+, React, TypeScript, and Tailwind CSS.

## Features

- User authentication (Register/Login/Logout)
- Dashboard with income and expense overview
- Income management (Add, Edit, Delete income)
- Expense management (Add, Edit, Delete expenses)
- Interactive bar graph visualization of monthly income and expenses
- Real-time balance calculation
- Responsive design for mobile and desktop
- Consistent footer across all pages with important links

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18.17.0 or later)
- npm (usually comes with Node.js)
- Git

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm start`: Runs the built app in production mode.
- `npm run lint`: Runs the linter to check for code quality issues.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── modals/
│   │   │   └── overview/
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── register/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── context/
│   └── lib/
├── package.json
└── ...
```

## Technologies Used

- [Next.js 13+](https://nextjs.org/) - React framework with App Router
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS
- [Recharts](https://recharts.org/) - Composable charting library for React
- [ESLint](https://eslint.org/) - Linting utility for JavaScript and TypeScript
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
