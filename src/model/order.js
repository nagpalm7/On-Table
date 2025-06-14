import mongoose from 'mongoose';
import orderItemSchema from './orderItem';

const orderSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, default: 0 },
  commissionAmount: { type: Number, required: true, default: 0 },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['draft', 'review', 'placed', 'preparing', 'delivered'],
    default: 'draft'
  },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: undefined } // ⏰ Optional, only for drafts
});

// TTL index (expires document once `expireAt` < now)
orderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
