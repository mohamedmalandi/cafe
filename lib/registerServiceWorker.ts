export function registerServiceWorker() {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported');
        return;
    }

    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
            });

            console.log('Service Worker registered:', registration.scope);

            // Handle updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (!newWorker) return;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('New service worker available');
                        // You could show a notification to the user here
                    }
                });
            });
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    });
}
