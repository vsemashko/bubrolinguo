import { SkeletonLeaderboard } from '@/components/ui/Skeleton';

export default function LeaderboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-5 w-96 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <SkeletonLeaderboard />
    </div>
  );
}
