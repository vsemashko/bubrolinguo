import { SkeletonLessonCard } from '@/components/ui/Skeleton';

export default function LessonsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-5 w-96 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonLessonCard key={i} />
        ))}
      </div>
    </div>
  );
}
