import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

interface Category {
    _id: string;
    name: { ar: string; en: string };
    icon: string;
}

interface Product {
    _id: string;
    name: { ar: string; en: string };
    description: { ar: string; en: string };
    price: number;
    image?: string;
    isNew: boolean;
}

interface CategorySectionProps {
    category: Category;
    products: Product[];
    currency: string;
}

export default function CategorySection({ category, products, currency }: CategorySectionProps) {
    return (
        <section id={`category-${category._id}`} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-foreground">{category.name.ar}</h2>
                <span className="text-lg text-muted">({products.length})</span>
            </div>

            {products.length === 0 ? (
                <EmptyState message={`لا يوجد منتجات في ${category.name.ar} حالياً`} />
            ) : (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product, index) => (
                        <ProductCard key={product._id} product={product} index={index} currency={currency} />
                    ))}
                </div>
            )}
        </section>
    );
}
