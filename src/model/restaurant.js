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
            default: 'active',
        },
        onboardingStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'revoked'],
            default: 'pending',
        },
        logo: {
            type: String
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