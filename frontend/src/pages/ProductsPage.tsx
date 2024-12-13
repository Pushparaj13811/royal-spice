import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { products } from '@/lib/data';

export function ProductsPage() {
  const location = useLocation();
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter((product) => category === 'all' || product.category === category)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white spice-pattern">
      {/* Page Container */}
      <div className="container mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-primary">Our Products</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium spices and dry fruits
            sourced from the best farms worldwide.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <ProductFilters
            onCategoryChange={setCategory}
            onSortChange={setSortBy}
          />
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
