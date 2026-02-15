import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
    windowMs: number; // Time window in milliseconds
    max: number; // Max requests per window
}

export function rateLimit(options: RateLimitOptions) {
    const { windowMs, max } = options;

    return function rateLimitMiddleware(request: NextRequest): NextResponse | null {
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const now = Date.now();

        // Lazy cleanup: remove stale entries when map gets large
        if (rateLimitMap.size > 100) {
            const entries = Array.from(rateLimitMap.entries());
            for (const [key, data] of entries) {
                if (now > data.resetTime) {
                    rateLimitMap.delete(key);
                }
            }
        }

        const rateLimitData = rateLimitMap.get(ip);

        if (!rateLimitData || now > rateLimitData.resetTime) {
            // New window
            rateLimitMap.set(ip, {
                count: 1,
                resetTime: now + windowMs,
            });
            return null; // Allow request
        }

        if (rateLimitData.count >= max) {
            // Rate limit exceeded
            return NextResponse.json(
                { error: 'Too many requests, please try again later.' },
                { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimitData.resetTime - now) / 1000)) } }
            );
        }

        // Increment count
        rateLimitData.count++;
        return null; // Allow request
    };
}
