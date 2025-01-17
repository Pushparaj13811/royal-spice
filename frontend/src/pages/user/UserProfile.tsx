import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, MapPin, Phone, Mail, Calendar, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatPhoneNumber, formatDate, getAvatarUrl, getInitials } from '@/lib/utils';
import { Activity } from '@/types/user.types'

export function UserProfile() {
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header Section with Avatar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={getAvatarUrl(user.email)} alt={user.fullName} />
            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{user.fullName}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-2 max-w-[300px]">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Customer</Badge>
              {user.emailVerified && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white">
                  <Shield className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
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
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="mt-1">{user.fullName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </p>
              <p className="mt-1">{user.mobile ? formatPhoneNumber(user.mobile) : 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Member Since
              </p>
              <p className="mt-1">{user.createdAt ? formatDate(user.createdAt) : 'Not available'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        <Card className="bg-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {user.addresses && user.addresses.length > 0 ? (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Street Address</p>
                  <p className="mt-1">{user.addresses[0].street || 'Not provided'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">City</p>
                    <p className="mt-1">{user.addresses[0].city || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">State</p>
                    <p className="mt-1">{user.addresses[0].state || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pincode</p>
                    <p className="mt-1">{user.addresses[0].pincode || 'Not provided'}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-center py-4">No address information available</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="md:col-span-2 bg-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {user?.recentActivity && user.recentActivity.length > 0 ? (
                user.recentActivity.map((activity: Activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(activity.timestamp)}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.action}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}