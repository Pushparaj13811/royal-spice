import { Skeleton } from '@/components/ui/skeleton';

export function HeroSkeleton() {
  return (
    <div className="relative h-[90vh] w-full">
      <Skeleton className="absolute inset-0" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-6 flex justify-center items-center h-full">
          <div className="max-w-2xl space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-xl">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}