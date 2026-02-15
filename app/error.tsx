'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-background-secondary border border-border rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    حدث خطأ
                </h2>
                <p className="text-lg text-foreground mb-4">Something went wrong</p>
                <p className="text-sm text-muted mb-6">
                    عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={reset}
                        className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        إعادة المحاولة
                    </button>
                    <a
                        href="/"
                        className="flex-1 bg-background border border-border hover:bg-border text-foreground font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        الرئيسية
                    </a>
                </div>
            </div>
        </div>
    );
}
