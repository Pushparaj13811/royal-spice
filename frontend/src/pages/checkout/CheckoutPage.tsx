import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/hooks/useCart';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, calculateTotal } = useCart();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-semibold">Please sign in to checkout</h2>
          <p className="text-muted-foreground">
            You need to be signed in to complete your purchase
          </p>
          <Button onClick={() => navigate('/auth/login')}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Add some items to your cart to proceed with checkout
          </p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <CheckoutForm
          onSubmit={async (data) => {
            setIsProcessing(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate('/checkout/payment', {
              state: { shippingDetails: data },
            });
            setIsProcessing(false);
          }}
          isProcessing={isProcessing}
        />
        <OrderSummary items={items} total={calculateTotal()} />
      </div>
    </div>
  );
}
