// middleware.js
import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';

export async function middleware(req) {
    try {
        await connectMongoDB(); // Ensure the MongoDB connection is established
    } catch (error) {
        console.error('MongoDB middleware connection error:', error);
        return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }

    return NextResponse.next(); // Proceed to the next middleware or request handler
}

export const config = {
    matcher: ['/api/:path*'], // Apply middleware only to API routes
};
