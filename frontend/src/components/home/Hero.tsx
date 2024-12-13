import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Hero() {
  const heroData = [
    {
      image:
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2940',
      headline: 'Premium Quality Spices',
      subheadline: 'Discover Authentic Indian Flavors',
      description:
        'Experience the finest selection of authentic Indian spices, carefully sourced and delivered fresh to your doorstep.',
      accentColor: 'from-orange-500 to-red-600',
    },
    {
      image:
        'https://www.itoozhiayurveda.in/wp-content/uploads/2023/10/set-pecan-pistachios-almond-peanut-cashew-pine-nuts-lined-up-assorted-nuts-dried-fruits-mini-different-bowls-scaled.jpg',
      headline: 'Handpicked Dry Fruits',
      subheadline: "Nature's Finest Selection",
      description:
        'Indulge in premium quality dry fruits, sourced directly from the best farms worldwide.',
      accentColor: 'from-green-500 to-emerald-600',
    },
    {
      image:
        'https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1740&dpr=2',
      headline: 'Artisanal Collection',
      subheadline: 'Crafted with Passion',
      description:
        'Explore our curated collection of premium spices and dry fruits, perfect for every culinary creation.',
      accentColor: 'from-purple-500 to-indigo-600',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroData.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + heroData.length) % heroData.length
    );
  };

  const currentSlide = heroData[currentImageIndex];

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroData.map((slide, index) => (
          <div
            key={index}
            className={`absolute h-full w-full bg-cover bg-center transition-all duration-1000 ${
              index === currentImageIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor} opacity-60`}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-6 flex justify-center items-center h-full">
          <div className="max-w-2xl space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              <span
                className={`block bg-gradient-to-r ${currentSlide.accentColor} font-bold bg-clip-text text-transparent`}
              >
                {currentSlide.headline}
              </span>
              <span className="block text-foreground text-2xl mt-2 font-medium tracking-wide leading-relaxed">
                {currentSlide.subheadline}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentSlide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`rounded-full bg-gradient-to-r ${currentSlide.accentColor} hover:opacity-90 text-white text-lg px-8`}
                asChild
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-lg px-8 border-2 border-foreground/20 hover:bg-accent/5"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`
              transition-all duration-300 ease-in-out
              ${
                index === currentImageIndex
                  ? 'w-8 bg-white'
                  : 'w-3 bg-white/50 hover:bg-white/70'
              }
              h-3 rounded-full
            `}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={handlePrevImage}
        className="absolute  left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 text-foreground p-2 rounded-full shadow-md hover:bg-white/90 transition-all hidden md:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 text-foreground p-2 rounded-full shadow-md hover:bg-white/90 transition-all hidden md:block"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Hero;
