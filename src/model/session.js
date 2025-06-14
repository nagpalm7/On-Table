import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }, // optional
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Session || mongoose.model('Session', sessionSchema);