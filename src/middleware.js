// src/middleware.js

import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb'; // Adjust the path as necessary

export default async function middleware(req) {
    return NextResponse.next(); // Continue to the next middleware or route handler
//   try {
//     await dbConnect(); // Ensure MongoDB connection
//     return NextResponse.next(); // Continue to the next middleware or route handler
//   } catch (error) {
//     console.error('MongoDB middleware connection error:', error);
//     return new NextResponse(
//       JSON.stringify({ error: 'Database connection error' }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
}

// Define the routes or paths where this middleware should be applied
export const config = {
  matcher: '/api/:path*', // Apply middleware to all API routes
};
