import mongoose from 'mongoose';
import 'server-only';

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
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "OnTable"
        });
        cachedConnection = conn.connection;
        console.log("Connected to MongoDB with Mongoose");
        return cachedConnection;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Database connection failed");
    }
}

export async function getDatabaseConnection() {
    if (!cachedConnection) {
        console.log("Establishing new database connection...");
        return await connectToDatabase();
    }
    console.log("Using cached database connection");
    return cachedConnection;
}

// export async function getCollection(collectionName) {
//     const db = await getDatabaseConnection();
//     return db.collection(collectionName);
// }