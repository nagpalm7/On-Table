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
        slug: { type: String, unique: true }
    },
    { timestamps: true }
);

restaurantSchema.pre('validate', function (next) {
  if (this.isNew && !this.slug) {
    const base = `${this.name} ${this.location || ''}`.trim();
    this.slug = slugify(base, { lower: true, strict: true }); // e.g. pizza-hut-sector-18
  }

  next();
});

export default mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);