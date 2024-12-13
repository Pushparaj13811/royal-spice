import { Suspense, lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { ProductDetailsSkeleton } from '@/components/products/ProductDetailsSkeleton';
import { ProductGridSkeleton } from '@/components/home/ProductSkeleton';

const ProductCard = lazy(() => import('@/components/products/ProductCard'));

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState('1');
  const [mainImage, setMainImage] = useState<string | undefined>(product?.images[0]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
      const imagePromises = product.images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch((error) => console.error('Error loading images:', error));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const recommendedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="spice-pattern">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        {!imagesLoaded ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="container mx-auto px-6 py-16">
            <div className="mx-auto">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="w-full h-[500px] overflow-hidden">
                    <img
                      src={mainImage}
                      alt={`${product.name} main image`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex gap-4 mt-4 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden cursor-pointer"
                        onClick={() => setMainImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} image ${index + 1}`}
                          className="h-24 w-24 object-cover border-2 border-gray-300 rounded-md hover:border-primary/30"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-3xl font-light text-foreground tracking-tight hover:text-primary/80 transition-colors">
                      {product.name}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-foreground tracking-tight">
                      ₹{product.price}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <label htmlFor="quantity" className="font-medium">
                        Quantity
                      </label>
                      <Select value={quantity} onValueChange={setQuantity}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-primary/30 text-primary hover:bg-primary/5 transition-colors"
                      onClick={() =>
                        addItem({ ...product, quantity: parseInt(quantity, 10) })
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recommended Products */}
              <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-8">
                  You may also like
                </h2>
                <Suspense fallback={<ProductGridSkeleton count={5} />}>
                  <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                    {recommendedProducts.map((recommendedProduct) => (
                      <ProductCard
                        key={recommendedProduct.id}
                        product={recommendedProduct}
                      />
                    ))}
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}
