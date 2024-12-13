import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 text-center md:grid-cols-2 lg:grid-cols-4 lg:text-left">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 lg:justify-start"
            >
              <span className="text-2xl font-bold text-primary">Royal</span>
              <span className="text-2xl font-bold text-secondary">Spice</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium spices and dry fruits, sourced directly from the finest
              farms and delivered fresh to your doorstep.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Contact Info
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Spice Market</li>
              <li>Mumbai, India</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Email: contact@royalspice.com</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Follow Us
            </h3>
            <div className="flex justify-center gap-4 lg:justify-start">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Royal Spice. All rights reserved.</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Developed and maintained by{' '}
            <a
              href="https://www.webwrap.tech/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Webwrap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}