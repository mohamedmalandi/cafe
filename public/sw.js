const CACHE_VERSION = 'v2';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Static assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/menu',
    '/offline',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => {
                        return (
                            key !== STATIC_CACHE &&
                            key !== DYNAMIC_CACHE &&
                            key !== IMAGE_CACHE
                        );
                    })
                    .map((key) => {
                        console.log('[SW] Deleting old cache:', key);
                        return caches.delete(key);
                    })
            );
        })
    );
    return self.clients.claim();
});

// Helper: Cache First Strategy
async function cacheFirst(request) {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);

    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('[SW] Fetch failed for:', request.url);
        return new Response('Offline', { status: 503 });
    }
}

// Helper: Network First Strategy
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('[SW] Network failed, trying cache for:', request.url);
        const cached = await caches.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}

// Helper: Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);

    const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    });

    return cached || fetchPromise;
}

// Fetch Event - Apply cache strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // API requests - Network First
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Images - Cache First
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Static assets - Cache First
    if (
        request.destination === 'script' ||
        request.destination === 'style' ||
        request.destination === 'font'
    ) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // HTML pages - Stale While Revalidate
    if (request.destination === 'document') {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }

    // Default - Network First
    event.respondWith(networkFirst(request));
});
