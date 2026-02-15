/**
 * TypeScript Interfaces for Database Models
 */

import { Document, Types } from 'mongoose';

// ============================================
// BILINGUAL TEXT INTERFACE
// ============================================
export interface BilingualText {
    ar: string;
    en: string;
}

// ============================================
// STORE SETTINGS (SINGLETON)
// ============================================
export interface IStoreSettings extends Document {
    name: BilingualText;
    wifiName: string;
    wifiPassword: string;
    currency: string;
    primaryColor: string;
    logoUrl?: string;
    whatsappNumber?: string;

    // About page fields
    heroImage?: string;
    description?: string;
    galleryImages?: string[];
    workingHours?: string;
    locationUrl?: string;
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
    };
    announcementText?: string;

    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// CATEGORY
// ============================================
export interface ICategory extends Document {
    name: BilingualText;
    order: number;
    icon?: string; // Emoji or icon name
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// PRODUCT
// ============================================
export interface IProduct extends Document {
    name: BilingualText;
    description: BilingualText;
    price: number;
    image?: string;
    categoryId: Types.ObjectId;
    isAvailable: boolean;
    isNew: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// ADMIN USER
// ============================================
export interface IAdminUser extends Document {
    email: string;
    password: string; // Hashed
    name?: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
