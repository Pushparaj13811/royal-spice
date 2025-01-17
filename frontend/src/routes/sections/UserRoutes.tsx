import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '@/routes/guards/AuthGuard';
import { PATHS } from '@/routes/paths';

// Lazy load components
const UserDashboard = lazy(() => import('@/pages/user/UserDashboard').then(module => ({ default: module.UserDashboard })));
const EditProfilePage = lazy(() => import('@/pages/user/EditProfilePage').then(module => ({ default: module.EditProfilePage })));
const OrdersPage = lazy(() => import('@/pages/OrdersPage').then(module => ({ default: module.OrdersPage })));
const OrderDetailsPage = lazy(() => import('@/pages/user/OrderDetailsPage').then(module => ({ default: module.OrderDetailsPage })));
const AddressPage = lazy(() => import('@/pages/user/AddressPage'));

export const userRoutes: RouteObject[] = [
  {
    path: PATHS.USER.DASHBOARD,
    element: (
      <AuthGuard>
        <UserDashboard />
      </AuthGuard>
    ),
  },
  {
    path: PATHS.USER.PROFILE,
    element: (
      <AuthGuard>
        <EditProfilePage />
      </AuthGuard>
    ),
  },
  {
    path: PATHS.USER.ORDERS,
    element: (
      <AuthGuard>
        <OrdersPage />
      </AuthGuard>
    ),
  },
  {
    path: PATHS.USER.ORDER_DETAILS,
    element: (
      <AuthGuard>
        <OrderDetailsPage />
      </AuthGuard>
    ),
  },
  {
    path: PATHS.USER.ADDRESSES,
    element: (
      <AuthGuard>
        <AddressPage />
      </AuthGuard>
    ),
  },
];