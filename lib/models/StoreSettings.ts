import mongoose, { Schema, Model } from 'mongoose';
import type { IStoreSettings } from '@/lib/types/models';

// Custom model interface to include static methods
interface IStoreSettingsModel extends Model<IStoreSettings> {
    getSettings(): Promise<IStoreSettings>;
}

const BilingualTextSchema = new Schema(
    {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    { _id: false }
);

const StoreSettingsSchema = new Schema<IStoreSettings>(
    {
        name: {
            ar: { type: String, required: true, default: 'مقهى' },
            en: { type: String, required: true, default: 'Cafe' },
        },
        wifiName: {
            type: String,
            default: '',
        },
        wifiPassword: {
            type: String,
            default: '',
        },
        currency: {
            type: String,
            required: true,
            default: 'SYP',
        },
        primaryColor: {
            type: String,
            default: '#f59e0b',
        },
        logoUrl: {
            type: String,
            default: '',
        },
        whatsappNumber: {
            type: String,
            default: '',
        },
        // About page fields
        heroImage: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        galleryImages: {
            type: [String],
            default: [],
        },
        workingHours: {
            type: String,
            default: '',
        },
        locationUrl: {
            type: String,
            default: '',
        },
        socialLinks: {
            facebook: { type: String, default: '' },
            instagram: { type: String, default: '' },
            tiktok: { type: String, default: '' },
        },
        announcementText: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        collection: 'store_settings',
    }
);

// Ensure only one document exists (singleton pattern)
StoreSettingsSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await (this.constructor as Model<IStoreSettings>).countDocuments();
        if (count > 0) {
            throw new Error('StoreSettings is a singleton. Only one document allowed.');
        }
    }
    next();
});

// Static method to get or create settings
StoreSettingsSchema.statics.getSettings = async function () {
    let settings = await this.findOne();

    if (!settings) {
        // Create default settings if none exist
        settings = await this.create({
            name: {
                ar: 'مقهى',
                en: 'Cafe',
            },
            wifiName: '',
            wifiPassword: '',
            currency: 'SYP',
            primaryColor: '#f59e0b',
            logoUrl: '',
            heroImage: '',
            description: '',
            galleryImages: [],
            workingHours: '',
            locationUrl: '',
            socialLinks: {
                facebook: '',
                instagram: '',
                tiktok: '',
            },
            announcementText: '',
        });
    }

    return settings;
};

const StoreSettings =
    (mongoose.models.StoreSettings as IStoreSettingsModel) ||
    mongoose.model<IStoreSettings, IStoreSettingsModel>('StoreSettings', StoreSettingsSchema);

export default StoreSettings;
