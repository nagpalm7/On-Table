import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

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
        active: { type: Boolean, default: false },
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