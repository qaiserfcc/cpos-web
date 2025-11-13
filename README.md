# cpos-web

Cloud POS Web – A responsive, cloud-based Point of Sale system for real-time sales and inventory management.

## Overview

This is the frontend application for the Cloud Point of Sale (CPOS) system, built with Next.js. It provides a responsive web interface for managing sales, inventory, customers, and other POS operations, consuming APIs from the cpos-api backend.

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand or React Context
- **API Client**: Axios or React Query (TanStack Query)
- **Authentication**: JWT tokens
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts or Chart.js
- **Deployment**: Vercel

## Features

### Authentication

- User login/logout
- JWT token management
- Protected routes
- Role-based access control

### Dashboard

- Sales overview with charts
- Recent transactions
- Inventory alerts
- Quick actions

### Product Management

- Product catalog
- Add/edit/delete products
- Category management
- Barcode scanning (future)

### Sales Management

- Point of sale interface
- Transaction history
- Receipt generation
- Return processing

### Inventory Management

- Stock levels tracking
- Low stock alerts
- Inventory adjustments
- Supplier management

### Customer Management

- Customer database
- Loyalty programs
- Purchase history
- Customer insights

### Reporting

- Sales reports
- Inventory reports
- Financial reports
- Custom date ranges

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Backend API (cpos-api) running

## Installation

1. Clone the repository
2. Navigate to the cpos-web directory
3. Install dependencies: `pnpm install` or `npm install`
4. Set up environment variables (see .env.example)
5. Start the development server: `pnpm dev` or `npm run dev`

## Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```bash
cpos-web/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes (if needed)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── api/             # API client functions
│   ├── auth/            # Authentication utilities
│   ├── utils.ts         # General utilities
│   └── validations/     # Zod schemas
├── middleware/           # Next.js middleware files
├── public/               # Static assets
├── styles/               # Additional styles
├── types/                # TypeScript type definitions
├── next.config.mjs       # Next.js configuration
├── package.json
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── components.json       # shadcn/ui configuration
```

## Deployment

The application is deployed on Vercel for optimal performance and scalability.

- Connect your GitHub repository to Vercel
- Configure environment variables in Vercel dashboard
- Automatic deployments on push to main branch
- Preview deployments for pull requests
- CDN for static assets
- Monitoring and error tracking with Vercel Analytics

## API Integration

The frontend communicates with the cpos-api backend through RESTful APIs. Key integration points:

- Authentication endpoints for login/register
- CRUD operations for products, sales, customers
- Real-time inventory updates
- File uploads for product images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
