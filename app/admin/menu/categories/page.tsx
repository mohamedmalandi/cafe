'use client';

import { useState, useEffect } from 'react';

interface Category {
    _id: string;
    name: { ar: string; en: string };
    order: number;
    icon: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: { ar: '', en: '' },
        order: 0,
        icon: '📁',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/categories');
            const data = await res.json();
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingCategory
                ? `/api/admin/categories/${editingCategory._id}`
                : '/api/admin/categories';

            const method = editingCategory ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchCategories();
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
            await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetForm = () => {
        setFormData({ name: { ar: '', en: '' }, order: 0, icon: '📁' });
        setEditingCategory(null);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            order: category.order,
            icon: category.icon,
        });
        setShowModal(true);
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">التصنيفات</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-2 px-6 rounded-lg"
                >
                    إضافة تصنيف
                </button>
            </div>


            {/* Categories Table - Mobile Responsive with Scroll Indicator */}
            <div className="relative">
                {/* Scroll Container with Visible Scrollbar */}
                <div
                    className="w-full overflow-x-auto shadow-md rounded-xl"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#f59e0b #2a2a2a',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <div className="bg-background-secondary border border-border rounded-xl overflow-hidden">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-background">
                                <tr>
                                    <th className="text-right p-4 text-foreground">الأيقونة</th>
                                    <th className="text-right p-4 text-foreground">الاسم (عربي)</th>
                                    <th className="text-right p-4 text-foreground">Name (English)</th>
                                    <th className="text-right p-4 text-foreground">الترتيب</th>
                                    <th className="text-right p-4 text-foreground">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id} className="border-t border-border">
                                        <td className="p-4 text-2xl">{category.icon}</td>
                                        <td className="p-4 text-foreground">{category.name.ar}</td>
                                        <td className="p-4 text-foreground">{category.name.en}</td>
                                        <td className="p-4 text-foreground">{category.order}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(category)}
                                                    className="bg-secondary hover:bg-secondary/90 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    تعديل
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id)}
                                                    className="bg-error hover:bg-error/90 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Scroll Indicator for Mobile - Right Edge Gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none md:hidden rounded-l-xl" />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background-secondary border border-border rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    الاسم (عربي)
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name.ar}
                                    onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
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
                                    onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    الأيقونة (Emoji)
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    الترتيب
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-2 rounded-lg"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="flex-1 bg-muted hover:bg-muted/90 text-background font-bold py-2 rounded-lg"
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
