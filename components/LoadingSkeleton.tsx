'use client';

export default function LoadingSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Hero Skeleton */}
            <div className="bg-background-secondary h-48 mb-6 rounded-lg" />

            {/* WiFi Card Skeleton */}
            <div className="bg-background-secondary h-32 mb-6 rounded-lg" />

            {/* Category Nav Skeleton */}
            <div className="flex gap-2 mb-6 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-background-secondary h-12 w-24 rounded-full" />
                ))}
            </div>

            {/* Product Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-background-secondary rounded-xl p-4">
                        <div className="bg-background h-48 rounded-lg mb-3" />
                        <div className="bg-background h-6 rounded mb-2" />
                        <div className="bg-background h-4 rounded w-3/4 mb-3" />
                        <div className="bg-background h-8 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
