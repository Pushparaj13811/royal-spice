import { Suspense, lazy } from 'react';
import { HeroSkeleton } from '@/components/home/HeroSkeleton';
import { FeaturedCategoriesSkeleton } from '@/components/home/FeaturedCategoriesSkeleton';
import { ProductGridSkeleton } from '@/components/home/ProductSkeleton';

const Hero = lazy(() => import('@/components/home/Hero'));
const FeaturedCategories = lazy(() => import('@/components/home/FeaturedCategories'));
const WhyChooseUs = lazy(() => import('@/components/home/WhyChooseUs'));
const Newsletter = lazy(() => import('@/components/home/Newsletter'));
const ProductCard = lazy(() => import('@/components/products/ProductCard'));

import { products } from '@/lib/data';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollAmount = scrollContainer.clientWidth / 2;
      if (direction === 'left') {
        scrollContainer.scrollLeft -= scrollAmount;
      } else {
        scrollContainer.scrollLeft += scrollAmount;
      }

      setTimeout(() => {
        if (scrollContainer) {
          setCanScrollLeft(scrollContainer.scrollLeft > 0);
          setCanScrollRight(
            scrollContainer.scrollLeft + scrollContainer.clientWidth <
            scrollContainer.scrollWidth - 20
          );
        }
      }, 200);
    }
  };

  const featuredProducts = products.filter((p) => p.featured).slice(0, 10);

  return (
    <div className="space-y-16 md:space-y-24">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<FeaturedCategoriesSkeleton />}>
        <FeaturedCategories />
      </Suspense>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our handpicked selection of premium products
            </p>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {canScrollLeft && isHovered && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 
                    bg-white/50 rounded-full p-2 
                    opacity-100 transition-all duration-300 
                    hover:bg-white/80"
                >
                  <ChevronLeft className="text-primary" size={24} />
                </button>
              )}

              {canScrollRight && isHovered && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 
                    bg-white/50 rounded-full p-2 
                    opacity-100 transition-all duration-300 
                    hover:bg-white/80"
                >
                  <ChevronRight className="text-primary" size={24} />
                </button>
              )}
              <div
                ref={scrollContainerRef}
                className="grid grid-flow-col auto-cols-[calc(50%-1rem)] md:auto-cols-[calc(33.33%-1rem)] lg:auto-cols-[calc(20%-1rem)] gap-6 overflow-x-auto no-scrollbar scroll-smooth"
              >
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

            </div>
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-primary/10 animate-pulse" />}>
        <Newsletter />
      </Suspense>
    </div>
  );
}