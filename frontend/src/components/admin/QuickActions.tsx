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
  PlusCircle,
  ShoppingBag,
  Users,
  FileText,
  Package,
  Percent,
} from 'lucide-react';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Product',
      description: 'Add new items to inventory',
      icon: <PlusCircle className="h-5 w-5" />,
      onClick: () => navigate('/admin/products/new'),
      color: 'text-green-500',
    },
    {
      title: 'Manage Orders',
      description: 'View and process orders',
      icon: <ShoppingBag className="h-5 w-5" />,
      onClick: () => navigate('/admin/orders'),
      color: 'text-blue-500',
    },
    {
      title: 'User Management',
      description: 'Manage customer accounts',
      icon: <Users className="h-5 w-5" />,
      onClick: () => navigate('/admin/users'),
      color: 'text-purple-500',
    },
    {
      title: 'Create Discount',
      description: 'Set up promotional offers',
      icon: <Percent className="h-5 w-5" />,
      onClick: () => navigate('/admin/discounts/new'),
      color: 'text-orange-500',
    },
    {
      title: 'Inventory',
      description: 'Check stock levels',
      icon: <Package className="h-5 w-5" />,
      onClick: () => navigate('/admin/inventory'),
      color: 'text-yellow-500',
    },
    {
      title: 'Reports',
      description: 'View sales analytics',
      icon: <FileText className="h-5 w-5" />,
      onClick: () => navigate('/admin/reports'),
      color: 'text-red-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        <CardDescription>Frequently used admin actions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start hover:bg-muted/50 group transition-colors"
            onClick={action.onClick}
          >
            <div className={`mr-2 ${action.color} group-hover:text-foreground transition-colors`}>
              {action.icon}
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium">{action.title}</span>
              <span className="text-xs text-muted-foreground">{action.description}</span>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
