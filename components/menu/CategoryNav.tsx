'use client';

import { useState, useEffect } from 'react';

interface Category {
    _id: string;
    name: { ar: string; en: string };
    icon: string;
    order: number;
}

interface CategoryNavProps {
    categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
    const [activeCategory, setActiveCategory] = useState('');

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(`category-${id}`);
        if (element) {
            const offset = 100; // Account for sticky nav
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            setActiveCategory(id);
        }
    };

    return (
        <div className="sticky top-0 z-10 bg-background border-b border-border py-4 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => scrollToCategory(category._id)}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeCategory === category._id
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'bg-background-secondary text-foreground hover:bg-border'
                            }`}
                    >
                        <span className="text-xl">{category.icon}</span>
                        <span className="whitespace-nowrap">{category.name.ar}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
