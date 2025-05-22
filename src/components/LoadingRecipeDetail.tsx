
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingRecipeDetail() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <Skeleton className="w-full h-40" />

            <div className="p-4">
                <div className="flex gap-2 justify-between mb-5">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <Skeleton className="h-7 w-full mb-2" />

                <Skeleton className="h-5 w-28 mb-5" />

                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-4" />
            </div>
        </div>
    )
}
