import { Suspense, lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Share2, Star } from 'lucide-react';
import { ProductDetailsSkeleton } from '@/components/products/ProductDetailsSkeleton';
import { ProductGridSkeleton } from '@/components/home/ProductSkeleton';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ProductCard = lazy(() => import('@/components/products/ProductCard'));

export function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
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

  const recommendedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const spiceLevelIndicator = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`inline-block w-3 h-3 rounded-full ${
            index < level ? 'bg-red-500' : 'bg-gray-200'
          }`}
        />
      ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        {!imagesLoaded ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 md:grid-cols-2">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={mainImage}
                      alt={`${product.name} main image`}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square cursor-pointer rounded-lg"
                        onClick={() => setMainImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} image ${index + 1}`}
                          className={`h-24 w-24 object-cover border-2 ${
                            mainImage === image
                              ? 'border-primary shadow-md'
                              : 'border-gray-200'
                          } rounded-lg hover:border-primary/30 transition-all`}
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Product Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-4xl font-semibold text-foreground">
                        {product.name}
                      </h1>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleShare}
                              className="hover:bg-primary/10"
                            >
                              <Share2 className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Share this product</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-bold text-primary">₹{product.price}</p>
                      <Badge variant="secondary" className="text-sm">
                        In Stock
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Spice Level</p>
                      <div className="flex gap-2">
                        {spiceLevelIndicator(product.spiceLevel || 3)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-2 hover:bg-gray-100 rounded-l-md"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-12 text-center border-x"
                            min="1"
                          />
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100 rounded-r-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          addItem({ ...product, quantity });
                          toast({
                            title: "Added to Cart",
                            description: `${product.name} (${quantity} ${quantity === 1 ? 'item' : 'items'}) has been added to your cart.`,
                            duration: 2000
                          });
                        }}
                        className="flex-1 gap-2"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="description" className="flex-1">
                        Description
                      </TabsTrigger>
                      <TabsTrigger value="ingredients" className="flex-1">
                        Ingredients
                      </TabsTrigger>
                      <TabsTrigger value="nutrition" className="flex-1">
                        Nutrition
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </TabsContent>
                    <TabsContent value="ingredients" className="mt-4">
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {product.ingredients?.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="nutrition" className="mt-4">
                      <div className="space-y-2 text-muted-foreground">
                        <p>Serving Size: 100g</p>
                        <p>Calories: {product.nutritionInfo?.calories || 'N/A'}</p>
                        <p>Protein: {product.nutritionInfo?.protein || 'N/A'}g</p>
                        <p>Carbohydrates: {product.nutritionInfo?.carbs || 'N/A'}g</p>
                        <p>Fat: {product.nutritionInfo?.fat || 'N/A'}g</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </div>

              {/* Recommended Products */}
              <div className="mt-16">
                <h2 className="text-2xl font-semibold mb-8">You May Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <Suspense fallback={<ProductGridSkeleton />}>
                    {recommendedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}
