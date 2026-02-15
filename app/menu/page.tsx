import connectDB from '@/lib/db';
import { StoreSettings, Category, Product } from '@/lib/models';
import Hero from '@/components/menu/Hero';
import WiFiCard from '@/components/menu/WiFiCard';
import CategoryNav from '@/components/menu/CategoryNav';
import CategorySection from '@/components/menu/CategorySection';
import CartButton from '@/components/menu/CartButton';
import CallWaiterButton from '@/components/menu/CallWaiterButton';
import OfflineIndicator from '@/components/OfflineIndicator';
import InstallPrompt from '@/components/InstallPrompt';
import { CartProvider } from '@/lib/contexts/CartContext';

// Force dynamic rendering - don't cache this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getMenuData() {
    await connectDB();

    const [settings, categories, products] = await Promise.all([
        StoreSettings.findOne().lean(),
        Category.find().sort({ order: 1 }).lean(),
        Product.find({ isAvailable: true }).sort({ createdAt: -1 }).lean(),
    ]);

    return {
        settings: JSON.parse(JSON.stringify(settings)),
        categories: JSON.parse(JSON.stringify(categories)),
        products: JSON.parse(JSON.stringify(products)),
    };
}

export default async function MenuPage() {
    const { settings, categories, products } = await getMenuData();

    // Group products by category
    const productsByCategory = categories.map((category: any) => ({
        category,
        products: products.filter(
            (product: any) => product.categoryId.toString() === category._id.toString()
        ),
    }));

    return (
        <CartProvider>
            <OfflineIndicator />
            <InstallPrompt />

            <div className="min-h-screen bg-background">
                <Hero settings={settings} />

                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    <WiFiCard settings={settings} />

                    <CategoryNav categories={categories} />

                    <div className="mt-8 space-y-12">
                        {productsByCategory.map(({ category, products }: { category: any; products: any[] }) => (
                            <CategorySection
                                key={category._id}
                                category={category}
                                products={products}
                            />
                        ))}
                    </div>
                </div>

                <CartButton whatsappNumber={settings.whatsappNumber} />
                <CallWaiterButton whatsappNumber={settings.whatsappNumber} />
            </div>
        </CartProvider>
    );
}
