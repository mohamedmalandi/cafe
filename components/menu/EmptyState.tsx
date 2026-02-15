'use client';

interface EmptyStateProps {
    message?: string;
}

export default function EmptyState({ message = 'لا يوجد منتجات في هذا القسم حالياً' }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4 opacity-50">📦</div>
            <h3 className="text-xl font-medium text-foreground/70 mb-2">
                {message}
            </h3>
            <p className="text-sm text-muted max-w-md text-center">
                No items currently in this section
            </p>
        </div>
    );
}
