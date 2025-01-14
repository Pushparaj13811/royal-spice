import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'nuts',
    name: 'Premium Nuts',
    description: 'Discover our collection of premium quality nuts',
    image: 'https://images.pexels.com/photos/6086300/pexels-photo-6086300.jpeg',
  },
  {
    id: 'dryfruits',
    name: 'Dry Fruits',
    description: 'Premium quality dry fruits from the finest sources',
    image: 'https://images.pexels.com/photos/4033329/pexels-photo-4033329.jpeg',
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-tight">Our Categories</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our carefully curated categories of premium products
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-light text-white">
                  {category.name}
                </h3>
                <p className="mt-2 text-white/90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
