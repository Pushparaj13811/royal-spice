import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PATHS } from '@/routes/paths';

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || PATHS.HOME;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>
}