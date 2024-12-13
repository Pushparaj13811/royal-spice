import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
