import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import { Category, Product } from '@/lib/models';

async function getStats() {
    await connectDB();

    const [totalCategories, totalProducts, availableProducts, newProducts] = await Promise.all([
        Category.countDocuments(),
        Product.countDocuments(),
        Product.countDocuments({ isAvailable: true }),
        Product.countDocuments({ isNew: true }),
    ]);

    return {
        totalCategories,
        totalProducts,
        availableProducts,
        newProducts,
    };
}

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const stats = await getStats();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    لوحة التحكم
                </h1>
                <p className="text-muted">Dashboard Overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Categories */}
                <div className="bg-background-secondary border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">📁</span>
                        <span className="text-3xl font-bold text-primary">
                            {stats.totalCategories}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground">التصنيفات</h3>
                    <p className="text-sm text-muted">Total Categories</p>
                </div>

                {/* Total Products */}
                <div className="bg-background-secondary border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">🍽️</span>
                        <span className="text-3xl font-bold text-secondary">
                            {stats.totalProducts}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground">المنتجات</h3>
                    <p className="text-sm text-muted">Total Products</p>
                </div>

                {/* Available Products */}
                <div className="bg-background-secondary border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">✅</span>
                        <span className="text-3xl font-bold text-accent">
                            {stats.availableProducts}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground">متاحة</h3>
                    <p className="text-sm text-muted">Available Products</p>
                </div>

                {/* New Products */}
                <div className="bg-background-secondary border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">🆕</span>
                        <span className="text-3xl font-bold text-warning">
                            {stats.newProducts}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground">جديدة</h3>
                    <p className="text-sm text-muted">New Products</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-background-secondary border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">إجراءات سريعة</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/menu/categories"
                        className="flex items-center gap-3 p-4 bg-background hover:bg-border rounded-lg transition-colors border border-border"
                    >
                        <span className="text-2xl">📁</span>
                        <div>
                            <p className="font-medium text-foreground">إدارة التصنيفات</p>
                            <p className="text-sm text-muted">Manage Categories</p>
                        </div>
                    </a>

                    <a
                        href="/admin/menu/products"
                        className="flex items-center gap-3 p-4 bg-background hover:bg-border rounded-lg transition-colors border border-border"
                    >
                        <span className="text-2xl">🍽️</span>
                        <div>
                            <p className="font-medium text-foreground">إدارة المنتجات</p>
                            <p className="text-sm text-muted">Manage Products</p>
                        </div>
                    </a>

                    <a
                        href="/admin/qr-code"
                        className="flex items-center gap-3 p-4 bg-background hover:bg-border rounded-lg transition-colors border border-border"
                    >
                        <span className="text-2xl">📱</span>
                        <div>
                            <p className="font-medium text-foreground">إنشاء رمز QR</p>
                            <p className="text-sm text-muted">Generate QR Code</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
