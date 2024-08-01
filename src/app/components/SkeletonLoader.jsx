"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="mt-5 bg-gray-950 p-3 rounded-xl min-w-[600px] min-h-[300px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center  gap-4 p-2 border-b">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-10 h-6" />
        </div>
      ))}
    </div>
  );
}
