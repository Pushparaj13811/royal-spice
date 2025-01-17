import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QuickLinks } from '@/components/user/QuickLinks';
import { 
  ShoppingBag, 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  MapPin,
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { UserProfile } from './UserProfile';
import { RecentOrders } from '@/components/user/RecentOrders';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn, getAvatarUrl, getInitials } from '@/lib/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { logout } from '@/features/auth/authThunks';
import { useToast } from '@/hooks/use-toast';

type View = 'overview' | 'profile' | 'settings';

export function UserDashboard() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        toast({
          title: 'Success',
          description: 'Logged out successfully',
        });
        navigate('/');
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: `Logout failed: ${error.message || error}`,
        });
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
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

  const sidebarItems = [
    {
      title: 'Overview',
      icon: LayoutDashboard,
      value: 'overview' as const,
    },
    {
      title: 'Profile',
      icon: User,
      value: 'profile' as const,
    },
    {
      title: 'Settings',
      icon: Settings,
      value: 'settings' as const,
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-5rem)] relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-background border rounded-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <div className={cn(
        "fixed md:static inset-y-0 left-0 z-40 w-64 flex-none flex flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-200 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex h-14 items-center border-b px-4 justify-between">
          <span className="font-semibold">Dashboard</span>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-2 p-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={getAvatarUrl(user?.email || '')} alt={user?.fullName} />
                <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{user?.fullName}</span>
                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {user?.email}
                </span>
              </div>
            </div>
            {sidebarItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setCurrentView(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted/50",
                  currentView === item.value ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </button>
            ))}
            <Separator className="my-4" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm transition-colors hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container py-4 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {sidebarItems.find(item => item.value === currentView)?.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your {currentView} and preferences
                </p>
              </div>
              <div className="flex gap-2 self-end sm:self-auto">
                <Button variant="outline" onClick={() => navigate('/orders/new')} className="text-sm">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">New Order</span>
                </Button>
                <Button variant="default" className="relative text-sm">
                  <Bell className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                  <Badge variant="secondary" className="ml-2">3</Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="container py-6 px-4">
            {currentView === 'overview' && (
              <div className="space-y-6 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium truncate">Total Orders</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-primary flex-shrink-0" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">127</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="text-emerald-500 mr-1">↑</span>
                        <span className="truncate">20.1% from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Other stat cards with same structure */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription className="truncate">Your order history from the past 30 days</CardDescription>
                      </CardHeader>
                      <CardContent className="overflow-auto">
                        <RecentOrders />
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription className="truncate">Frequently used features</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <QuickLinks />
                      </CardContent>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>Recent Notifications</CardTitle>
                        <CardDescription>
                          Stay updated with your order status
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="space-y-4">
                            {[
                              {
                                title: "Order #1234 is ready for pickup",
                                time: "2 minutes ago",
                                type: "success"
                              },
                              {
                                title: "New reward points added",
                                time: "1 hour ago",
                                type: "info"
                              },
                              {
                                title: "Special weekend offer available",
                                time: "3 hours ago",
                                type: "promo"
                              }
                            ].map((notification, i) => (
                              <div key={i} className="flex items-start space-x-4 rounded-md border p-3 hover:bg-muted/50 transition-colors">
                                <Bell className="mt-1 h-5 w-5 text-primary" />
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-medium">{notification.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
            {currentView === 'profile' && <UserProfile />}
            {currentView === 'settings' && (
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Manage your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="order-updates">Order Updates</Label>
                      <Switch id="order-updates" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="promotions">Promotional Emails</Label>
                      <Switch id="promotions" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <Switch id="newsletter" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>
                      Manage your security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <Switch id="two-factor" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="activity-log">Activity Log</Label>
                      <Switch id="activity-log" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <Switch id="data-sharing" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 rounded-md border p-4">
                        <CreditCard className="h-5 w-5" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">•••• 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 04/2024
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add New Card
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Delivery Addresses</CardTitle>
                    <CardDescription>
                      Manage your delivery locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 rounded-md border p-4">
                        <MapPin className="h-5 w-5" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Home</p>
                          <p className="text-sm text-muted-foreground">
                            123 Main St, City, Country
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        Add New Address
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
