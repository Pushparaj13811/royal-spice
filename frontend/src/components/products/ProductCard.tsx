import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/hooks/useCart';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  hideFeaturedBadge?: boolean;
}

export function ProductCard({
  product,
  hideFeaturedBadge = true,
}: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="relative overflow-hidden transition-all duration-300 border-b border-muted-foreground/20 pb-4 hover:border-primary/30">
      {/* Product Link */}
      <Link to={`/product/${product.id}`} className="block">
        {/* Single Image with Lazy Loading */}
        <div className="relative aspect-square mb-4 overflow-hidden">
          <img
            src={product.images[0]}
            alt={`${product.name}`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-80"
            loading="lazy"
          />
          {!hideFeaturedBadge && product.featured && (
            <Badge className="absolute right-0 top-0 bg-primary/10 text-primary font-medium">
              Featured
            </Badge>
          )}
        </div>

        {/* Product Content */}
        <div className="space-y-2 px-1">
          <h3 className="text-xl font-light text-foreground tracking-tight hover:text-primary/80 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl font-light text-foreground tracking-tight">
            ₹{product.price}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="mt-4 px-1">
        <Button
          variant="outline"
          className="w-full border-primary/30 text-primary hover:bg-primary/5 transition-colors"
          onClick={() => addItem({ ...product, quantity: 1 })}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
