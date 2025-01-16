import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/hooks/useCart';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { logout } from '@/features/auth/authThunks';

export function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        toast({
          title: 'Success',
          description: 'Logged out successfully',
        });
        navigate('/');
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: `Logout failed: ${error.message || error}`,
        });
      });

  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isAdmin = isAuthenticated && user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 flex h-20 items-center justify-between">
        <Link to="/" className="mr-2 flex items-center gap-2">
          <img src="/logo.png" alt="Royal Spice Logo" className="h-12 w-auto hidden md:block" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Swarnuts
          </span>
        </Link>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link
            to="/products"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="User menu"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user?.fullName}
                </div>
                <DropdownMenuSeparator />
                {isAdmin ? (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    Admin Dashboard
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => navigate('/user')}>
                    My Account
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/auth/login')}
              aria-label="Sign in"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate('/cart')}
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <Link
                to="/products"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={toggleMenu}
              >
                Cart ({itemCount})
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="text-sm font-medium">{user?.fullName}</div>
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="text-foreground/60 transition-colors hover:text-foreground"
                      onClick={toggleMenu}
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/user"
                      className="text-foreground/60 transition-colors hover:text-foreground"
                      onClick={toggleMenu}
                    >
                      My Account
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    className="justify-start px-0"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="text-foreground/60 transition-colors hover:text-foreground"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}