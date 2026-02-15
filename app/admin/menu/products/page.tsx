'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Product {
    _id: string;
    name: { ar: string; en: string };
    description: { ar: string; en: string };
    price: number;
    image?: string;
    categoryId: string;
    isAvailable: boolean;
    isNew: boolean;
}

interface Category {
    _id: string;
    name: { ar: string; en: string };
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: { ar: '', en: '' },
        description: { ar: '', en: '' },
        price: 0,
        image: '',
        categoryId: '',
        isAvailable: true,
        isNew: false,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                fetch('/api/admin/products'),
                fetch('/api/admin/categories'),
            ]);

            const productsData = await productsRes.json();
            const categoriesData = await categoriesRes.json();

            if (productsData.success) setProducts(productsData.products);
            if (categoriesData.success) setCategories(categoriesData.categories);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingProduct
                ? `/api/admin/products/${editingProduct._id}`
                : '/api/admin/products';

            const method = editingProduct ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchData();
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من الحذف؟')) return;

        try {
            await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: { ar: '', en: '' },
            description: { ar: '', en: '' },
            price: 0,
            image: '',
            categoryId: '',
            isAvailable: true,
            isNew: false,
        });
        setEditingProduct(null);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image || '',
            categoryId: product.categoryId,
            isAvailable: product.isAvailable,
            isNew: product.isNew,
        });
        setShowModal(true);
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">المنتجات</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-2 px-6 rounded-lg"
                >
                    إضافة منتج
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-background-secondary border border-border rounded-xl overflow-hidden"
                    >
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name.ar}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-foreground mb-1">
                                {product.name.ar}
                            </h3>
                            <p className="text-sm text-muted mb-3">{product.name.en}</p>

                            <div className="mb-3">
                                <span className="text-xl font-bold text-primary">
                                    {product.price} SYP
                                </span>
                            </div>

                            <div className="flex gap-2 mb-3">
                                {product.isNew && (
                                    <span className="text-xs bg-warning text-background px-2 py-1 rounded">
                                        جديد
                                    </span>
                                )}
                                <span
                                    className={`text-xs px-2 py-1 rounded ${product.isAvailable
                                        ? 'bg-accent text-background'
                                        : 'bg-error text-white'
                                        }`}
                                >
                                    {product.isAvailable ? 'متاح' : 'غير متاح'}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(product)}
                                    className="flex-1 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    تعديل
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="flex-1 bg-error hover:bg-error/90 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-background-secondary border border-border rounded-xl p-6 w-full max-w-2xl my-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {editingProduct ? 'تعديل المنتج' : 'إضافة منتج'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        الاسم (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name.ar}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: { ...formData.name, ar: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Name (English)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name.en}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: { ...formData.name, en: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        الوصف (عربي)
                                    </label>
                                    <textarea
                                        value={formData.description.ar}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: { ...formData.description, ar: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Description (English)
                                    </label>
                                    <textarea
                                        value={formData.description.en}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: { ...formData.description, en: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        السعر
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: parseFloat(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        التصنيف
                                    </label>
                                    <select
                                        required
                                        value={formData.categoryId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, categoryId: e.target.value })
                                        }
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                    >
                                        <option value="">اختر...</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name.ar}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <ImageUpload
                                value={formData.image}
                                onChange={(base64) => setFormData({ ...formData, image: base64 })}
                            />

                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isAvailable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isAvailable: e.target.checked })
                                        }
                                        className="w-4 h-4"
                                    />
                                    <span className="text-foreground">متاح</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isNew}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isNew: e.target.checked })
                                        }
                                        className="w-4 h-4"
                                    />
                                    <span className="text-foreground">جديد</span>
                                </label>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-3 rounded-lg"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 bg-muted hover:bg-muted/90 text-background font-bold py-3 rounded-lg"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
