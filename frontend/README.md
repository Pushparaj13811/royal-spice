# Royal Spice & Dryfruits - Portfolio & E-commerce Platform

A comprehensive portfolio and e-commerce platform developed by [Webwrap Technologies](https://www.webwrap.tech/) for Royal Spice & Dryfruits, showcasing their premium products and enabling online sales. Built with React, TypeScript, and Tailwind CSS.

## Overview

Royal Spice & Dryfruits' platform serves dual purposes:
1. A portfolio website showcasing the company's legacy, product range, and commitment to quality
2. An e-commerce platform enabling customers to purchase premium spices and dry fruits online

The application features a modern UI, responsive design, and comprehensive admin dashboard for managing products, orders, and content.

## Features

### Portfolio Features
- Company profile and history
- Product showcase and catalog
- Quality assurance information
- Manufacturing process highlights
- Client testimonials
- Contact information
- Blog/News section

### E-commerce Features
- User authentication (Login/Signup)
- Product browsing with filters and search
- Shopping cart management
- Secure checkout process
- Order tracking
- User profile management
- Wishlist functionality

### Admin Features
- Content management for portfolio sections
- Product management (CRUD operations)
- Order management
- User management
- Analytics dashboard
- Inventory management
- Category management
- Blog post management

## Technology Stack

- **Frontend Framework**: React with TypeScript

- **Styling**: Tailwind CSS

- **State Management**: Redux Toolkit

- **Form Handling**: React Hook Form with Zod validation

- **Routing**: React Router v6

- **HTTP Client**: Axios

- **UI Components**: Radix UI

- **Build Tool**: Vite

- **Authentication**: JWT with refresh token mechanism

## Project Structure

```
src/
├── app/
│   └── store.ts
├── components/
│   ├── admin/
│   │   ├── AdminOrders.tsx
│   │   ├── AdminProducts.tsx
│   │   ├── AdminUsers.tsx
│   │   └── ProductForm.tsx
│   ├── auth/
│   │   └── GoogleButton.tsx
│   ├── cart/
│   │   └── CartItem.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   └── OrderSummary.tsx
│   ├── home/
│   │   ├── About.tsx
│   │   ├── Hero.tsx
│   │   ├── Newsletter.tsx
│   │   ├── ProductSkeleton.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── portfolio/
│   │   ├── CompanyHistory.tsx
│   │   ├── QualityAssurance.tsx
│   │   └── Manufacturing.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   ├── ui/
│       └── [shared components]
├── features/
│   ├── auth/
│   ├── product/
│   └── user/
├── hooks/
│   ├── useAppSelector.ts
│   └── use-toast.ts
├── lib/
│   ├── api/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   └── validations/
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── checkout/
│   └── user/
├── routes/
│   ├── guards/
│   └── sections/
├── services/
│   └── axios.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/webwrap/royal-spices.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```


## Environment Variables

```env
VITE_API_BASE_URL=https://backend.meetonchai.com/api/v1/
```

## Available Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```


## Authentication


The application uses JWT-based authentication with refresh token mechanism. Protected routes are secured using route guards:

- `AuthGuard`: For authenticated users

- `AdminGuard`: For admin users

- `GuestGuard`: For non-authenticated users

- `CheckoutGuard`: For checkout process

## State Management

Redux Toolkit is used for global state management with the following slices:

- `auth`: Authentication state

- `product`: Product management

- `user`: User profile and preferences

Local state management uses:

- React's useState and useEffect

- Custom hooks

- Zustand for cart management

## API Integration

API calls are handled using Axios with a custom instance that includes:

- Base URL configuration

- Request/Response interceptors

- Token management

- Error handling

## Deployment

The application can be deployed using any static hosting service. Build the application using:

```bash
npm run build
```

## Contributing


1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## License

Proprietary software developed and maintained by [Webwrap Technologies](https://www.webwrap.tech/).

---

Developed with ❤️ by [Webwrap Technologies](https://www.webwrap.tech/)

For support, contact: support@webwrap.tech