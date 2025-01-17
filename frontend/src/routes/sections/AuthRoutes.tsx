import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { GuestGuard } from '@/routes/guards/GuestGuard';
import { PATHS } from '@/routes/paths';

// Lazy load components
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('@/pages/auth/SignupPage').then(module => ({ default: module.SignupPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage').then(module => ({ default: module.ForgotPasswordPage })));
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage').then(module => ({ default: module.VerifyEmailPage })));
const VerifyMobilePage = lazy(() => import('@/pages/auth/VerifyMobilePage').then(module => ({ default: module.VerifyMobilePage })));

export const authRoutes: RouteObject[] = [
  {
    path: PATHS.LOGIN,
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: PATHS.SIGNUP,
    element: (
      <GuestGuard>
        <SignupPage />
      </GuestGuard>
    ),
  },
  {
    path: PATHS.FORGOT_PASSWORD,
    element: (
      <GuestGuard>
        <ForgotPasswordPage />
      </GuestGuard>
    ),
  },
  {
    path: PATHS.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: PATHS.VERIFY_MOBILE,
    element: <VerifyMobilePage />,
  },
];