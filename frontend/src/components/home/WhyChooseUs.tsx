import { ReasonsToChooseUs } from '@/lib/data';

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-tight">Why Choose Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover what makes our products and service stand out
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {ReasonsToChooseUs.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
