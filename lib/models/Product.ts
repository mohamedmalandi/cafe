import mongoose, { Schema, Model } from 'mongoose';
import type { IProduct } from '@/lib/types/models';

const BilingualTextSchema = new Schema(
    {
        ar: { type: String, required: true },
        en: { type: String, required: true },
    },
    { _id: false }
);

const ProductSchema = new Schema(
    {
        name: {
            type: BilingualTextSchema,
            required: true,
        } as any,
        description: {
            type: BilingualTextSchema,
            required: true,
        } as any,
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        image: {
            type: String,
            default: '',
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        isNew: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for performance
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ isAvailable: 1 });
ProductSchema.index({ isNew: 1 });

// Ensure virtuals are included in JSON
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

const Product =
    (mongoose.models.Product as Model<IProduct>) ||
    mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
