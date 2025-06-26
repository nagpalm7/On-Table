import mongoose from 'mongoose';
import orderItemSchema from './orderItem';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789', 8);

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  sessionId: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, default: 0 },
  commissionAmount: { type: Number, required: true, default: 0 },
  paymentMode: {
    type: String,
    enum: ['cash', 'online'],
    default: 'cash'
  },
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
  phone: { type: String, required: false },
  email: { type: String, required: false },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: undefined }
});

// TTL index (expires document once `expireAt` < now)
orderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

orderSchema.pre('validate', async function (next) {
  console.log("create");
  if (this.isNew && !this.orderNumber) {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    this.orderNumber = `OT-${today}-${nanoid()}`;
  }
  next();
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
