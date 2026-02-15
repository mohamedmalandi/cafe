import mongoose, { Schema, Model } from 'mongoose';
import type { ICategory } from '@/lib/types/models';

const BilingualTextSchema = new Schema(
    {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    { _id: false }
);

const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: BilingualTextSchema,
            required: true,
        } as any,
        order: {
            type: Number,
            required: true,
            default: 0,
        },
        icon: {
            type: String,
            default: '📁',
        },
    },
    {
        timestamps: true,
    }
);

// Index for ordering
CategorySchema.index({ order: 1 });

const Category =
    (mongoose.models.Category as Model<ICategory>) ||
    mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
