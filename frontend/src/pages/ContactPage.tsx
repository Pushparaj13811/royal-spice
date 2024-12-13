import { ContactForm } from '@/components/contact/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="container mx-auto py-16 md:py-24 text-center">
        <h1 className="text-4xl font-light md:text-5xl tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Have questions about our products or services? We're here to help.
          Contact us using any of the methods below.
        </p>
      </div>

      {/* Contact Information */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden transition-all duration-300 rounded-lg bg-background p-6 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight">Visit Us</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    123 Spice Market
                    <br />
                    Mumbai, India
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden transition-all duration-300 rounded-lg bg-background p-6 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight">Call Us</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Mon-Fri from 8am to 5pm
                    <br />
                    +91 123 456 7890
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden transition-all duration-300 rounded-lg bg-background p-6 shadow-lg hover:shadow-xl md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight">Email Us</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Send us your query anytime!
                    <br />
                    contact@spicestore.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <h2 className="text-2xl font-light tracking-tight mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}