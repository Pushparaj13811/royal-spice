import { useLocation } from 'react-router-dom';
import { UserOrders } from '@/components/user/UserOrders';
import { mockOrders } from '@/lib/api/orders';

export function OrdersPage() {
  const location = useLocation();
  const newOrder = location.state?.orderDetails;

  // Combine new order with existing orders
  const orders = [
    ...(newOrder ? [newOrder] : []), // Include the new order if it exists
    ...mockOrders, // Add existing mock orders
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>
      <UserOrders orders={orders} />
    </div>
  );
}
