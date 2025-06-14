import mongoose from 'mongoose';

const appSettingsSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
      unique: true, // one settings document per restaurant
    },
    restaurantCommissionRate: {
      type: Number,
      default: 10, // % commission per order
    },
    restaurantCommissionType: {
      type: String,
      enum: ['percentage', 'flat'],
      default: 'percentage',
    },
  },
  { timestamps: true }
);

export default mongoose.models.AppSettings || mongoose.model('AppSettings', appSettingsSchema);
