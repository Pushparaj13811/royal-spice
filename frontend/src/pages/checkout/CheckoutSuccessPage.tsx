import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';

export function CheckoutSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
      return;
    }
    clearCart();
  }, [orderDetails, navigate, clearCart]);

  if (!orderDetails) return null;

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-semibold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        <div className="text-left bg-card rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {orderDetails.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {orderDetails.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {orderDetails.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {orderDetails.address}
            </p>
            <p>
              <span className="font-medium">Total Amount:</span> ₹
              {orderDetails.total}
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          <Button
            variant="outline"
            onClick={() => navigate('/user/orders')}
          >
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
}