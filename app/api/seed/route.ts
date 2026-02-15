import { NextResponse } from 'next/server';
import { seedAll } from '@/lib/seed';

/**
 * API route to seed the database with sample data
 * Call this once to populate your database
 * 
 * Usage: GET /api/seed
 */
export async function GET() {
    try {
        await seedAll();

        return NextResponse.json({
            success: true,
            message: '✅ Database seeded successfully',
            data: {
                storeSettings: 'Created',
                categories: '4 categories',
                products: '5 sample products',
                adminUser: 'admin@cafe.com (password: admin123456)',
            },
        });
    } catch (error: any) {
        console.error('Seeding error:', error);

        return NextResponse.json(
            {
                success: false,
                message: '❌ Seeding failed',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
