'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
    value: string;
    onChange: (base64: string) => void;
    label?: string;
    maxWidth?: number;
}

export default function ImageUpload({ value, onChange, label = 'Product Image', maxWidth = 800 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // Compress image
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: maxWidth,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onChange(base64String);
                setUploading(false);
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            setUploading(false);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-foreground mb-2">
                {label}
            </label>

            {value && (
                <div className="mb-4">
                    <img
                        src={value}
                        alt="Product preview"
                        className="w-40 h-40 object-cover rounded-lg border border-border"
                    />
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
                {uploading ? 'Compressing...' : value ? 'Change Image' : 'Upload Image'}
            </button>

            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="mr-2 bg-error hover:bg-error/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Remove
                </button>
            )}

            <p className="text-xs text-muted mt-2">
                Max 800px, compressed to &lt;500KB
            </p>
        </div>
    );
}
