"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-4 min-w-[800px] min-h-[400px] mt-10">
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
