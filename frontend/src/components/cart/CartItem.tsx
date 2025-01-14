import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);

  const handleRemove = () => {
    removeItem(item.id);
    setIsConfirmRemoveOpen(false);
    toast({
      title: "Item removed",
      description: `${item.name} has been removed from your cart.`,
    });
  };

  const handleSaveForLater = () => {
    if (!isInWishlist(item.id)) {
      addToWishlist(item);
      removeItem(item.id);
      toast({
        title: "Saved for later",
        description: `${item.name} has been moved to your wishlist.`,
      });
    } else {
      toast({
        title: "Already in wishlist",
        description: `${item.name} is already in your wishlist.`,
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6">
      <Link to={`/product/${item.id}`} className="block">
        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border">
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between mb-2">
          <Link to={`/product/${item.id}`}>
            <h3 className="text-base font-medium hover:text-primary transition-colors">
              {item.name}
            </h3>
          </Link>
          <div className="flex items-center gap-4">
            <p className="text-base font-medium">₹{item.price * item.quantity}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-lg"
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-12 text-center text-sm">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-r-lg"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-destructive"
              onClick={() => setIsConfirmRemoveOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground"
              onClick={handleSaveForLater}
            >
              <Heart className={`h-4 w-4 mr-1 ${isInWishlist(item.id) ? 'fill-primary' : ''}`} />
              Save for Later
            </Button>
          </div>
        </div>
      </div>

      {/* Remove Item Confirmation Dialog */}
      <AlertDialog open={isConfirmRemoveOpen} onOpenChange={setIsConfirmRemoveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {item.name} from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
