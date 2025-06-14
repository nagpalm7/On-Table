import mongoose from 'mongoose';
import orderItemSchema from '@/model/orderItem';

const orderSchema = new mongoose.Schema({
  sessionId: { type: String, required: true }, // Link to Session
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [orderItemSchema],

  totalAmount: { type: Number, required: true },
  commissionAmount: { type: Number, required: true }, // Your cut from the order
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['placed', 'preparing', 'delivered'], default: 'placed' },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
