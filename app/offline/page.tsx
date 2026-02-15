export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="text-6xl mb-6">📡</div>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                    غير متصل بالإنترنت
                </h1>
                <p className="text-lg text-foreground mb-2">You're Offline</p>
                <p className="text-muted mb-6">
                    يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى
                </p>
                <p className="text-sm text-muted">
                    Please check your internet connection and try again
                </p>
            </div>
        </div>
    );
}
