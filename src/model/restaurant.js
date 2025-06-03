import mongoose, { Schema } from 'mongoose';

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
        onboardingStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'revoked'],
            default: 'pending',
        },
        logo: {
            type: String,
            default: null,
            required: false,
        },
        owners: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);