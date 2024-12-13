import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AdminGuard } from '@/routes/guards/AdminGuard';
import { PATHS } from '@/routes/paths';

// Lazy load components
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const ProductFormPage = lazy(() => import('@/pages/admin/ProductFormPage').then(module => ({ default: module.ProductFormPage })));

export const adminRoutes: RouteObject[] = [
  {
    path: PATHS.ADMIN.DASHBOARD,
    element: (
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    ),
  },
  {
    path: PATHS.ADMIN.PRODUCTS.NEW,
    element: (
      <AdminGuard>
        <ProductFormPage />
      </AdminGuard>
    ),
  },
  {
    path: PATHS.ADMIN.PRODUCTS.EDIT,
    element: (
      <AdminGuard>
        <ProductFormPage />
      </AdminGuard>
    ),
  },
];