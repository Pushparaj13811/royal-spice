import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

// Mock data - in a real app, this would come from an API
const mockOrders: Order[] = [
  {
    id: '1',
    customer: 'John Doe',
    date: '2024-03-15',
    total: 2499,
    status: 'pending',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    date: '2024-03-14',
    total: 1899,
    status: 'completed',
  },
  // Add more mock orders as needed
];

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: 'Order Updated',
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>₹{order.total}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    disabled={
                      order.status === 'completed' ||
                      order.status === 'cancelled'
                    }
                  >
                    Complete
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    disabled={
                      order.status === 'completed' ||
                      order.status === 'cancelled'
                    }
                  >
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}