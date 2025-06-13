const { default: mongoose } = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    available: { type: Boolean, default: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    variants: [
        {
            name: { type: String, required: true }, // e.g., Small, Medium, Full
            price: { type: Number, required: true }
        }
    ],
    addons: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ]
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);