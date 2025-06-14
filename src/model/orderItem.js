import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    variant: { type: String, required: true }, // e.g., "Large"
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    addons: [
      {
        name: String,
        price: Number,
      },
    ],
  },
  { _id: false }
);

export default orderItemSchema;
