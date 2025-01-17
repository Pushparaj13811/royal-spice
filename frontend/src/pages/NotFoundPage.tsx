import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function NotFoundPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Logo Pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <div className="absolute top-0 left-0 w-[20rem] h-[20rem] -rotate-12">
          <img src="/logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-1/4 right-0 w-[15rem] h-[15rem] rotate-12">
          <img src="/logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] rotate-45">
          <img src="/logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-1/2 left-1/3 w-[25rem] h-[25rem] -rotate-6">
          <img src="/logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-[22rem] h-[22rem] rotate-12">
          <img src="/logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-0 right-0 w-[16rem] h-[16rem] -rotate-12">
          <img src="/logo.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] gap-12 text-center px-6 relative z-10">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary drop-shadow-sm">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Page Not Found
          </h2>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed font-medium">
          Oops! It seems you've taken a wrong turn. Unfortunately, the page you're looking for doesn't exist. Let us help you rediscover our world of premium dry fruits, crafted with love and sourced from the finest farms.
        </p>
        <Link to="/">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-16 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
