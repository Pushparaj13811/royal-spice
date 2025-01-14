import { ContactForm } from '@/components/contact/ContactForm';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with Pattern Background */}
      <div className="relative bg-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.03] bg-[size:20px_20px]" />
        <div className="container mx-auto py-20 md:py-32 relative">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
              Let's Connect
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Have questions about our premium spices or need assistance? We're here to help you
              experience the finest flavors from around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <MapPin className="h-6 w-6 text-primary" />,
              title: "Visit Our Store",
              details: ["123 Spice Market", "Mumbai, India"],
              color: "from-purple-500/20 to-blue-500/20"
            },
            {
              icon: <Phone className="h-6 w-6 text-primary" />,
              title: "Call Us Anytime",
              details: ["Mon-Fri from 8am to 5pm", "+91 123 456 7890"],
              color: "from-amber-500/20 to-red-500/20"
            },
            {
              icon: <Mail className="h-6 w-6 text-primary" />,
              title: "Email Support",
              details: ["Send us your query anytime!", "contact@spicestore.com"],
              color: "from-emerald-500/20 to-cyan-500/20"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-background p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${item.color}" />
              <div className="relative z-10">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <div className="mt-2 space-y-1">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="relative bg-background rounded-xl shadow-xl p-8 border border-border/50 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
            <div className="relative">
              <div className="max-w-md">
                <h2 className="text-3xl font-light tracking-tight mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  We'd love to hear from you! Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            <div className="aspect-square rounded-xl overflow-hidden shadow-xl border border-border/50 group hover:shadow-2xl transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650721050000!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-8 border border-border/50 shadow-lg">
              <h3 className="text-xl font-medium mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Business Hours</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}