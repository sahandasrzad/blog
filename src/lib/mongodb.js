// lib/mongodb.js
import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export async function connectMongoDB() {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        const uri = process.env.MONGODB_URI; // Your MongoDB URI
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(uri, options);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        isConnected = false;
        throw new Error('Failed to connect to MongoDB');
    }
}

export function getConnectionStatus() {
    return isConnected;
}
