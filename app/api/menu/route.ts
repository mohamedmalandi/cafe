import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { StoreSettings, Category, Product } from '@/lib/models';

export async function GET() {
    try {
        await connectDB();

        const [settings, categories, products] = await Promise.all([
            StoreSettings.getSettings(),
            Category.find().sort({ order: 1 }),
            Product.find({ isAvailable: true }).sort({ createdAt: -1 }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                settings,
                categories,
                products,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
