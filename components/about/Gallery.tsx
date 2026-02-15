'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <section className="py-16 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-foreground mb-2">معرض الصور / Gallery</h2>
                    <p className="text-muted">استكشف أجواء مقهانا / Explore our vibes</p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        ×
                    </button>
                    <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                        <Image
                            src={selectedImage}
                            alt="Full size"
                            fill
                            className="object-contain"
                        />
                    </div>
                </motion.div>
            )}
        </section>
    );
}
