import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useCart } from '@/lib/hooks/useCart';
import { PATHS } from '@/routes/paths';

interface CheckoutGuardProps {
  children: React.ReactNode;
}

export function CheckoutGuard({ children }: CheckoutGuardProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items } = useCart();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
  }

  // Redirect to cart if cart is empty
  if (items.length === 0) {
    return <Navigate to={PATHS.CART} replace />;
  }

  return <>{children}</>;
}