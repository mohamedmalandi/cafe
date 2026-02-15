import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IAdminUser } from '@/lib/types/models';

const AdminUserSchema = new Schema<IAdminUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        name: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// Index for email lookup
AdminUserSchema.index({ email: 1 });

// Hash password before saving
AdminUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Method to compare passwords
AdminUserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const AdminUser =
    (mongoose.models.AdminUser as Model<IAdminUser>) ||
    mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);

export default AdminUser;
