import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { CheckoutGuard } from '@/routes/guards/CheckoutGuard';
import { PATHS } from '@/routes/paths';

// Lazy load components
const CheckoutPage = lazy(() => import('@/pages/checkout/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const PaymentPage = lazy(() => import('@/pages/checkout/PaymentPage').then(module => ({ default: module.PaymentPage })));
const CheckoutSuccessPage = lazy(() => import('@/pages/checkout/CheckoutSuccessPage').then(module => ({ default: module.CheckoutSuccessPage })));

export const checkoutRoutes: RouteObject[] = [
  {
    path: PATHS.CHECKOUT.BASE,
    element: (
      <CheckoutGuard>
        <CheckoutPage />
      </CheckoutGuard>
    ),
  },
  {
    path: PATHS.CHECKOUT.PAYMENT,
    element: (
      <CheckoutGuard>
        <PaymentPage />
      </CheckoutGuard>
    ),
  },
  {
    path: PATHS.CHECKOUT.SUCCESS,
    element: (
      <CheckoutGuard>
        <CheckoutSuccessPage />
      </CheckoutGuard>
    ),
  },
];