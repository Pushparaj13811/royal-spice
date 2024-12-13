import { useCart } from '@/lib/hooks/useCart';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export function CartPage() {
  const { items, calculateTotal } = useCart();
  const total = calculateTotal();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Add some items to your cart to continue shopping
          </p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => navigate('/checkout')}
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
