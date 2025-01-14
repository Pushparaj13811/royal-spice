import { useWishlist } from '@/lib/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
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
import { Link } from 'react-router-dom';
import { Product } from '@/types';

export function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleMoveToCart = (item: Product) => {
    addItem({ ...item, quantity: 1 });
    removeItem(item.id);
    toast({
      title: "Added to cart",
      description: `${item.name} has been moved to your cart.`,
    });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    setItemToRemove(null);
    toast({
      title: "Item removed",
      description: "Item has been removed from your wishlist.",
    });
  };

  const handleClearWishlist = () => {
    clearWishlist();
    setIsConfirmClearOpen(false);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-muted-foreground">
            Save items you like to your wishlist and they'll show up here
          </p>
          <Button onClick={() => navigate('/products')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">My Wishlist ({items.length} items)</h1>
        <Button variant="outline" onClick={() => setIsConfirmClearOpen(true)}>
          Clear Wishlist
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group relative rounded-lg border p-4 hover:shadow-md transition-shadow">
            <Link to={`/product/${item.id}`} className="block">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            <p className="mt-2 text-lg font-medium">₹{item.price}</p>
            
            <div className="mt-4 flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleMoveToCart(item)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => setItemToRemove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Wishlist Confirmation Dialog */}
      <AlertDialog open={isConfirmClearOpen} onOpenChange={setIsConfirmClearOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Wishlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear your wishlist? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearWishlist}>
              Clear Wishlist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Item Confirmation Dialog */}
      <AlertDialog
        open={itemToRemove !== null}
        onOpenChange={() => setItemToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this item from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => itemToRemove && handleRemoveItem(itemToRemove)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
