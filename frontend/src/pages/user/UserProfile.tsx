import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil } from 'lucide-react';

export function UserProfile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Profile Information</h2>
          <p className="text-sm text-muted-foreground">
            Manage your personal information
          </p>
        </div>
        <Button onClick={() => navigate('/user/edit-profile')}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Details Card */}
        <Card className="bg-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-lg font-medium">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">First Name</p>
                <p className="mt-1">{user?.firstName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                <p className="mt-1">{user?.lastName || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="mt-1">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="mt-1">{user?.phone || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        <Card className="bg-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-lg font-medium">Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Street Address</p>
              <p className="mt-1">{user?.address?.street || 'Not provided'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">City</p>
                <p className="mt-1">{user?.address?.city || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">State</p>
                <p className="mt-1">{user?.address?.state || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pincode</p>
              <p className="mt-1">{user?.address?.pincode || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="md:col-span-2 bg-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Last Login</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  From Mumbai, India
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Last Order</p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Order #123456
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Account Created</p>
                  <p className="text-sm text-muted-foreground">March 15, 2024</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Via Email
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}