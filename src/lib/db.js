import 'server-only';
import mongoose from 'mongoose';

if (!process.env.DB_URI) {
    throw new Error('DB_URI environment variable is not set');
}

let cachedConnection = null;

async function connectToDatabase() {
    if (cachedConnection) {
        return cachedConnection;
    }
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            dbName: "OnTable"
        });
        cachedConnection = conn.connection;
        return cachedConnection;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Database connection failed");
    }
}

export async function getDatabaseConnection() {
    if (!cachedConnection) {
        return await connectToDatabase();
    }
    return cachedConnection;
}
