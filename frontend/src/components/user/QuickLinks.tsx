import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Settings,
  MessageSquare,
  Package,
} from 'lucide-react';

export function QuickLinks() {
  const navigate = useNavigate();

  const links = [
    {
      title: 'My Cart',
      description: 'View and checkout items',
      icon: <ShoppingCart className="h-5 w-5" />,
      onClick: () => navigate('/cart'),
    },
    {
      title: 'Wishlist',
      description: 'Products you love',
      icon: <Heart className="h-5 w-5" />,
      onClick: () => navigate('/wishlist'),
    },
    {
      title: 'Track Order',
      description: 'Check order status',
      icon: <Package className="h-5 w-5" />,
      onClick: () => navigate('/user/orders'),
    },
    {
      title: 'Support',
      description: 'Get help with orders',
      icon: <MessageSquare className="h-5 w-5" />,
      onClick: () => navigate('/support'),
    },
    {
      title: 'Settings',
      description: 'Manage your account',
      icon: <Settings className="h-5 w-5" />,
      onClick: () => navigate('/user/settings'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>Frequently used actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((link) => (
            <Button
              key={link.title}
              variant="outline"
              className="h-auto w-full flex items-start gap-3 p-3 hover:bg-accent transition-colors"
              onClick={link.onClick}
            >
              <div className="p-2 bg-primary/5 rounded-lg flex-shrink-0">{link.icon}</div>
              <div className="text-left min-w-0">
                <h3 className="font-semibold truncate">{link.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {link.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
