import { SkeletonVocabularyCard } from '@/components/ui/Skeleton';

export default function VocabularyReviewLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
      </div>

      <SkeletonVocabularyCard />
    </div>
  );
}
