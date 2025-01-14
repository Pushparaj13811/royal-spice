import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Activity {
  id: string;
  user: {
    name: string;
    image?: string;
  };
  action: string;
  timestamp: string;
  type: 'order' | 'user' | 'product' | 'review';
}

const recentActivities: Activity[] = [
  {
    id: '1',
    user: {
      name: 'Rahul Sharma',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    },
    action: 'placed an order for Premium Cashews',
    timestamp: '2 minutes ago',
    type: 'order',
  },
  {
    id: '2',
    user: {
      name: 'Priya Patel',
    },
    action: 'registered a new account',
    timestamp: '10 minutes ago',
    type: 'user',
  },
  {
    id: '3',
    user: {
      name: 'Admin',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    action: 'updated Almonds stock',
    timestamp: '1 hour ago',
    type: 'product',
  },
  {
    id: '4',
    user: {
      name: 'Amit Kumar',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    action: 'left a 5-star review',
    timestamp: '2 hours ago',
    type: 'review',
  },
  {
    id: '5',
    user: {
      name: 'Neha Singh',
    },
    action: 'placed an order for Mixed Dry Fruits',
    timestamp: '3 hours ago',
    type: 'order',
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'order':
      return (
        <svg
          className="h-4 w-4 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      );
    case 'user':
      return (
        <svg
          className="h-4 w-4 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    case 'product':
      return (
        <svg
          className="h-4 w-4 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      );
    case 'review':
      return (
        <svg
          className="h-4 w-4 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      );
  }
};

export function RecentActivity() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-8">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.user.image} alt={activity.user.name} />
                  <AvatarFallback>
                    {activity.user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {getActivityIcon(activity.type)}
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
