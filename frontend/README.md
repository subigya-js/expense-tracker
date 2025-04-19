# Expense Tracker Frontend

This is the frontend for the Expense Tracker application, built with Next.js 13+, React, TypeScript, and Tailwind CSS.

## Features

- User authentication (Register/Login/Logout)
- Dashboard with income, expense, and balance amount overview
- Add and filter incomes and expenses
- Categorize expenses
- Interactive bar graph visualization of monthly income and expenses
- Real-time income, expense, and balance amount calculation
- Download transactions in Excel format
- Responsive design for mobile and desktop

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
│   │   ├── register/
│   │   └── transactions/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── context/
│   ├── lib/
│   └── api/
├── package.json
└── ...
```

## Environment Variables

Create a `.env.local` file in the root of the frontend directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
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
