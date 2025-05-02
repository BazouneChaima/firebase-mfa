import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Get session token from cookie
    const sessionToken = request.cookies.get('session_token')?.value;

    if (sessionToken) {
      // Delete session from database
      await prisma.session.deleteMany({
        where: { sessionToken },
      });
    }

    // Create response and clear cookie
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    response.cookies.set({
      name: 'session_token',
      value: '',
      expires: new Date(0), // Expire immediately
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
