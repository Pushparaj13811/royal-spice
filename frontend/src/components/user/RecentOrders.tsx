import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: string;
  items: number;
}

const recentOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2024-01-13',
    status: 'processing',
    total: '₹2,499',
    items: 3,
  },
  {
    id: 'ORD002',
    date: '2024-01-10',
    status: 'shipped',
    total: '₹1,299',
    items: 2,
  },
  {
    id: 'ORD003',
    date: '2024-01-05',
    status: 'delivered',
    total: '₹3,999',
    items: 4,
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'processing':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'shipped':
      return 'bg-blue-500/10 text-blue-500';
    case 'delivered':
      return 'bg-green-500/10 text-green-500';
  }
};

export function RecentOrders() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/user/orders')}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">Order #{order.id}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {order.items} items
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.total}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
