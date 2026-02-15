'use client';

import { useState } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

interface MultiImageUploadProps {
    images: string[];
    onChange: (images: string[]) => void;
}

export default function MultiImageUpload({ images, onChange }: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        try {
            const compressedImages: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Compression options for gallery images
                const options = {
                    maxWidthOrHeight: 1200,
                    useWebWorker: true,
                    maxSizeMB: 0.8,
                };

                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();

                const base64 = await new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(compressedFile);
                });

                compressedImages.push(base64);
            }

            onChange([...images, ...compressedImages]);
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('خطأ في رفع الصور');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    معرض الصور / Gallery Images
                </label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                    id="gallery-upload"
                />
                <label
                    htmlFor="gallery-upload"
                    className={`
                        block w-full px-4 py-8 border-2 border-dashed rounded-lg text-center cursor-pointer
                        transition-colors
                        ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-background-secondary'}
                    `}
                >
                    {uploading ? (
                        <span className="text-muted">جاري الضغط والرفع...</span>
                    ) : (
                        <>
                            <span className="text-2xl mb-2 block">📸</span>
                            <span className="text-foreground font-medium">اختر صور متعددة</span>
                            <br />
                            <span className="text-xs text-muted">Max 1200px, ~800KB each</span>
                        </>
                    )}
                </label>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-background border border-border">
                            <Image
                                src={img}
                                alt={`Gallery ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-error text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {images.length === 0 && (
                <p className="text-sm text-muted text-center py-8">
                    لم يتم رفع صور بعد
                </p>
            )}
        </div>
    );
}
