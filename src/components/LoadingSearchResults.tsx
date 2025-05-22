import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSearchResults() {
    return (
        <div className="container w-full max-w-7xl mx-auto p-8">
            <div className="mb-6">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-6 w-64 mt-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow">
                        {/* Image placeholder */}
                        <Skeleton className="w-full h-40" />

                        <div className="p-4">
                            {/* Title */}
                            <Skeleton className="h-7 w-full mb-2" />

                            {/* Cuisine type */}
                            <Skeleton className="h-5 w-28 mb-5" />

                            {/* Recipe description */}
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-3/4 mb-4" />

                            {/* Tags */}
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
