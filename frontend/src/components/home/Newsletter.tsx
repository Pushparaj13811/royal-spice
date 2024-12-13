import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function Newsletter() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Success',
      description: 'Thank you for subscribing to our newsletter!',
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light tracking-tight">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Stay updated with our latest products, special offers, and cooking
            tips
          </p>
          <form onSubmit={handleSubmit} className="mt-8 flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="secondary">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
