import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    order: { type: Number, default: 0 } // to sort categories
});


export default mongoose.models.Category || mongoose.model('Category', categorySchema);