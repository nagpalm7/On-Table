import mongoose, { Schema } from 'mongoose';

const USER_MODEL_NAME = 'User';

// Define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type: String,
        enum: ['admin', 'user', 'rest_owner'],
        required: true
    },
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
}, {
    timestamps: true
});

export default mongoose.models[USER_MODEL_NAME] || mongoose.model(USER_MODEL_NAME, userSchema);;
