import { testimonials, ReasonsToChooseUs } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function AboutPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/products', { state: { scrollToTop: true } });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="container mx-auto py-16 md:py-24 text-center">
        <h1 className="text-4xl font-light md:text-5xl tracking-tight">
          Welcome to Spices
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          We're a new company dedicated to providing premium-quality, authentic
          products that meet the highest standards. From sourcing to packaging,
          we ensure excellence in every step.
        </p>
        <div className="relative aspect-video max-w-4xl mx-auto mt-8 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1058035/pexels-photo-1058035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="High-quality products"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-90"
            loading="lazy"
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-8 space-y-12">
          <h2 className="text-3xl font-light tracking-tight text-center">
            Why Choose Us?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {ReasonsToChooseUs.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-all duration-300 border-b border-muted-foreground/20 pb-4 hover:border-primary/30"
              >
                <div className="relative aspect-square mb-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-80"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2 px-1 text-center">
                  <h3 className="text-xl font-light text-foreground tracking-tight hover:text-primary/80 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-8 py-16">
        <h2 className="text-3xl font-light tracking-tight text-center">
          What Our Customers Say
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative overflow-hidden transition-all duration-300 border-b border-muted-foreground/20 pb-4 hover:border-primary/30"
            >
              <div className="space-y-4 px-1">
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <h4 className="text-sm font-light text-foreground tracking-tight">
                    {testimonial.name}
                  </h4>
                </div>
                <div className="flex items-center">
                  {/* Render rating dynamically */}
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="text-primary text-sm"
                      aria-label="Star"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Section */}
      <div className="bg-primary py-16 text-center text-primary-foreground">
        <h2 className="text-3xl font-light tracking-tight">
          Experience the Best with Us
        </h2>
        <p className="mt-4 text-lg">
          Join us on our journey to bring the finest quality products directly
          to you.
        </p>
        <div className="relative aspect-video max-w-3xl mx-auto mt-8 overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/028/672/514/small_2x/assorted-nuts-and-dried-fruit-background-organic-food-in-wooden-bowls-top-view-ai-generated-photo.jpg"
            alt="Premium product delivery"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-90"
            loading="lazy"
          />
        </div>
        <Button
          variant="outline"
          className="mt-8 border-primary/30 text-primary hover:bg-primary/5 transition-colors"
          onClick={handleButtonClick}
        >
          Explore high quality products
        </Button>
      </div>
    </div>
  );
}
