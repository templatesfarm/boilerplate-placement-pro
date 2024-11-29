import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}


export function HeroSkeleton() {
  return (
    <div className="flex flex-col justify-center items-start space-y-4 my-10">
      <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-24 min-w-full" />
        <Skeleton className="h-12 min-w-full" />
        <Skeleton className="h-8 min-w-full" />
        <Skeleton className="h-4 min-w-full" />
    </div>
  )
}
