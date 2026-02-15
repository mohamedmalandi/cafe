import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// BUG FIX 1: Removed duplicate middleware definition and authMiddleware reference
// Using only withAuth from next-auth/middleware as per project context

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/login',
        },
    }
);

export const config = {
    matcher: ['/admin/:path*'],
};
