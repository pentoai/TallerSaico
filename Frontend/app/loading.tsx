import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Skeleton className="h-10 w-1/4 mb-8" />

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <div className="flex justify-between mt-4">
              <Skeleton className="h-4 w-20" />
              <div className="space-x-2">
                <Skeleton className="h-9 w-16 inline-block" />
                <Skeleton className="h-9 w-16 inline-block" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
