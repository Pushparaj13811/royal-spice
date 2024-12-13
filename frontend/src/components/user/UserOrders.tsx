import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OrderDetails } from '@/types';

export function UserOrders({ orders }: { orders: OrderDetails[] }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order: OrderDetails) => (
        <Card key={order.id} className="p-4 !shadow-none bg-transparent">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
            <Badge
              variant={
                order.status === 'completed'
                  ? 'default'
                  : order.status === 'cancelled'
                  ? 'destructive'
                  : 'secondary'
              }
            >
              {order.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Date: {order.orderDate}
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium">Items:</h4>
            <ul className="list-disc list-inside text-sm">
              {order.items.map((item: any, index: number) => (
                <li key={index}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium">Total: ₹{order.total}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/user/orders/${order.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
