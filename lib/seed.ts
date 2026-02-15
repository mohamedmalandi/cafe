/**
 * Database Seed Utilities
 * Use these functions to populate the database with sample data
 */

import connectDB from './db';
import { StoreSettings, Category, Product, AdminUser } from './models';

/**
 * Seed default store settings
 */
export async function seedStoreSettings() {
    await connectDB();

    const existingSettings = await StoreSettings.findOne();
    if (existingSettings) {
        console.log('⏭️  Store settings already exist, skipping...');
        return existingSettings;
    }

    const settings = await StoreSettings.create({
        name: {
            ar: 'مقهى سوريا',
            en: 'Syria Cafe',
        },
        wifiName: 'Cafe_WiFi',
        wifiPassword: 'welcome123',
        whatsappNumber: '+963999999999',
        primaryColor: '#f59e0b',
        currency: 'SYP',
    });

    console.log('✅ Store settings seeded');
    return settings;
}

/**
 * Seed sample categories
 */
export async function seedCategories() {
    await connectDB();

    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
        console.log('⏭️  Categories already exist, skipping...');
        return existingCategories;
    }

    const categories = await Category.insertMany([
        {
            name: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
            order: 1,
            icon: '☕',
        },
        {
            name: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
            order: 2,
            icon: '🥤',
        },
        {
            name: { ar: 'حلويات', en: 'Desserts' },
            order: 3,
            icon: '🍰',
        },
        {
            name: { ar: 'وجبات خفيفة', en: 'Snacks' },
            order: 4,
            icon: '🍟',
        },
    ]);

    console.log(`✅ ${categories.length} categories seeded`);
    return categories;
}

/**
 * Seed sample products
 */
export async function seedProducts() {
    await connectDB();

    const existingProducts = await Product.find();
    if (existingProducts.length > 0) {
        console.log('⏭️  Products already exist, skipping...');
        return existingProducts;
    }

    const categories = await Category.find().sort({ order: 1 });
    if (categories.length === 0) {
        console.log('⚠️  No categories found. Seed categories first.');
        return [];
    }

    const products = await Product.insertMany([
        // Hot Drinks
        {
            name: { ar: 'قهوة عربية', en: 'Arabic Coffee' },
            description: { ar: 'قهوة عربية أصيلة مع الهيل', en: 'Authentic Arabic coffee with cardamom' },
            price: 5000,
            categoryId: categories[0]._id,
            isAvailable: true,
            isNew: false,
        },
        {
            name: { ar: 'شاي', en: 'Tea' },
            description: { ar: 'شاي أسود منعش', en: 'Refreshing black tea' },
            price: 3000,
            categoryId: categories[0]._id,
            isAvailable: true,
            isNew: false,
        },
        // Cold Drinks
        {
            name: { ar: 'عصير برتقال طازج', en: 'Fresh Orange Juice' },
            description: { ar: 'عصير برتقال طبيعي 100%', en: '100% natural orange juice' },
            price: 8000,
            categoryId: categories[1]._id,
            isAvailable: true,
            isNew: true,
        },
        {
            name: { ar: 'كولا', en: 'Cola' },
            description: { ar: 'مشروب غازي بارد', en: 'Cold soft drink' },
            price: 4000,
            categoryId: categories[1]._id,
            isAvailable: true,
            isNew: false,
        },
        // Desserts
        {
            name: { ar: 'كيك بالشوكولاتة', en: 'Chocolate Cake' },
            description: { ar: 'كيك شوكولاتة فاخر', en: 'Premium chocolate cake' },
            price: 12000,
            categoryId: categories[2]._id,
            isAvailable: true,
            isNew: true,
        },
    ]);

    console.log(`✅ ${products.length} products seeded`);
    return products;
}

/**
 * Seed admin user
 */
export async function seedAdminUser() {
    await connectDB();

    const existingAdmin = await AdminUser.findOne({ email: 'admin@cafe.com' });
    if (existingAdmin) {
        console.log('⏭️  Admin user already exists, skipping...');
        return existingAdmin;
    }

    const admin = await AdminUser.create({
        email: 'admin@cafe.com',
        password: 'admin123456', // Will be hashed automatically
        name: 'Admin',
    });

    console.log('✅ Admin user seeded (email: admin@cafe.com, password: admin123456)');
    return admin;
}

/**
 * Seed all data
 */
export async function seedAll() {
    console.log('🌱 Starting database seeding...\n');

    try {
        await seedStoreSettings();
        const categories = await seedCategories();
        await seedProducts();
        await seedAdminUser();

        console.log('\n✅ All data seeded successfully!');
    } catch (error) {
        console.error('❌ Seeding error:', error);
        throw error;
    }
}
