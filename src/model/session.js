import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    userAgent: { type: String },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now },
    lastSeen: {
        type: Date,
        default: Date.now,
        index: { expires: '7d' } // 💣 TTL index here
    },
}, { timestamps: true });


export default mongoose.models.Session || mongoose.model('Session', sessionSchema);