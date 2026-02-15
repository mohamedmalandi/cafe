'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Product {
    _id: string;
    name: { ar: string; en: string };
    description: { ar: string; en: string };
    price: number;
    image?: string;
    isNew: boolean;
}

interface ProductCardProps {
    product: Product;
    index: number;
    currency: string;
}

export default function ProductCard({ product, index, currency }: ProductCardProps) {
    const { addItem } = useCart();
    const [imageLoading, setImageLoading] = useState(true);

    const handleAddToCart = () => {
        addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
        });

        // Show toast notification
        toast.success('تمت الإضافة للسلة', {
            duration: 2000,
            position: 'bottom-center',
            style: {
                background: 'var(--background-secondary)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
            },
            icon: '🛒',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-[#1c1c1c] border border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
        >
            {/* Image Container - Square Aspect Ratio */}
            <div className="relative w-full aspect-square overflow-hidden">
                {product.image ? (
                    <>
                        {/* Loading Skeleton */}
                        {imageLoading && (
                            <div className="absolute inset-0 animate-pulse bg-neutral-800" />
                        )}

                        {/* Actual Image */}
                        <Image
                            src={product.image}
                            alt={product.name.ar}
                            fill
                            className="object-cover w-full rounded-t-2xl"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            onLoadingComplete={() => setImageLoading(false)}
                        />

                        {/* New Badge - Compact Top Right */}
                        {product.isNew && (
                            <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg">
                                جديد
                            </div>
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-600 text-4xl">
                        🍽️
                    </div>
                )}
            </div>

            {/* Content Area - Compact & Centered */}
            <div className="p-3 text-center space-y-2">
                {/* Product Title - Compact */}
                <h3 className="text-sm font-medium text-gray-100 leading-tight line-clamp-1">
                    {product.name.ar}
                </h3>

                {/* Arabic Description - NEW */}
                {product.description.ar && (
                    <p className="text-xs text-gray-400 leading-tight line-clamp-2">
                        {product.description.ar}
                    </p>
                )}

                {/* Price Section - Large & Gold */}
                <div className="text-lg font-bold text-amber-400" style={{ color: 'var(--primary)' }}>
                    {formatPrice(product.price, currency)}
                </div>

                {/* Floating Action Button - Full Width */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleAddToCart}
                    className="w-8 h-8 mx-auto bg-primary hover:bg-primary-dark text-primary-foreground font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                    <span className="text-lg leading-none">+</span>
                </motion.button>
            </div>
        </motion.div>
    );
}
