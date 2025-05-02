import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get session token from cookie
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Find session
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Check if session is expired
    if (new Date() > session.expires) {
      // Delete expired session
      await prisma.session.delete({
        where: { id: session.id },
      });
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = session.user;

    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'An error occurred while checking session' },
      { status: 500 }
    );
  }
}
