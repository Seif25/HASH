import { NextPage } from "next";
import { Skeleton } from "@/components/ui/skeleton"


export default function HashCardSkeleton() {
    return (
        <>
            <Skeleton className="flex flex-col gap-5 p-5 w-full rounded-lg h-[150px] bg-accent2" />
        </>
    )
}