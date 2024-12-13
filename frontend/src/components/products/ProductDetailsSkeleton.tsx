import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Section */}
        <div className="space-y-4">
          <Skeleton className="w-full h-[500px]" />
          <div className="flex gap-4 mt-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-24" />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-8 w-32" />
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}