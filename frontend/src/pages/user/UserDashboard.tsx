import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/components/user/UserProfile';
import { Package } from 'lucide-react';

export function UserDashboard() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-semibold">Please sign in to continue</h2>
          <p className="text-muted-foreground">
            You need to be signed in to view your dashboard
          </p>
          <Button onClick={() => navigate('/auth/login')}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">My Account</h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile and view your orders
          </p>
        </div>
        <Button
          onClick={() => navigate('/user/orders')}
          className="mt-4 md:mt-0"
          variant="outline"
        >
          <Package className="mr-2 h-4 w-4" />
          View Orders
        </Button>
      </div>

      <UserProfile />
    </div>
  );
}
