import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserStats } from '@/components/user/UserStats';
import { QuickLinks } from '@/components/user/QuickLinks';
import { ShoppingBag, User, Settings } from 'lucide-react';
import { UserProfile } from '@/components/user/UserProfile';
import { RecentOrders } from '@/components/user/RecentOrders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function UserDashboard() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
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
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.fullName}!</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and track your orders
          </p>
        </div>
      </div>

      <div className="mb-8">
        <UserStats />
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <RecentOrders />
            </div>
            <div className="md:col-span-1">
              <QuickLinks />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add account settings form here */}
              <p className="text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
