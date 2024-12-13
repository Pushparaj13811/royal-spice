import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PATHS } from '@/routes/paths';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  // Check if user is admin (adjust this based on your user roles implementation)
  const isAdmin = user?.role === 'admin';
  
  if (!isAdmin) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return <>{children}</>;
}