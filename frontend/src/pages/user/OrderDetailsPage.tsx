import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { getOrderById } from '@/lib/api/orders';
import { useEffect, useState } from 'react';
import { OrderDetails } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateDeliveryDate } from '@/lib/utils/date';

export function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(id!);
        setOrder(orderData);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (!order) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold">Order not found</h2>
        <Button
          onClick={() => navigate('/user/orders')}
          className="mt-4"
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  const deliveryDate = calculateDeliveryDate(order.orderDate);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/user/orders')}
        >
          ← Back to Orders
        </Button>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Order #{order.id}</h1>
            <p className="text-muted-foreground mt-1">
              Placed on {format(new Date(order.orderDate), 'PPP')}
            </p>
          </div>
          <Badge
            className="mt-2 md:mt-0"
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

        <div className="grid gap-8 md:grid-cols-2">
          {/* Order Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Items</h2>
            <div className="rounded-lg border divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <div className="rounded-lg border p-4 space-y-4">
              <h2 className="text-xl font-semibold">Delivery Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Expected Delivery:</span>{' '}
                  {format(deliveryDate, 'PPP')}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{' '}
                  {order.shippingAddress}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {order.phone}
                </p>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-4">
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Payment Method:</span>{' '}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Subtotal:</span> ₹
                  {order.subtotal}
                </p>
                <p>
                  <span className="font-medium">Shipping:</span>{' '}
                  {order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost}`}
                </p>
                <div className="border-t pt-2">
                  <p className="font-medium">
                    Total: ₹{order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDetailsSkeleton() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
          <Skeleton className="h-6 w-24 mt-2 md:mt-0" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-lg border p-4 space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}