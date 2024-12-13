import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedCategoriesSkeleton() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="relative overflow-hidden rounded-lg">
              <Skeleton className="aspect-[16/9] w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}