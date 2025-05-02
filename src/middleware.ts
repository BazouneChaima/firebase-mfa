import { NextRequest, NextResponse } from 'next/server';

// Define paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/settings'];

// Define paths that are only accessible to non-authenticated users
const authPaths = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Check if the path is for non-authenticated users only
  const isAuthPath = authPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Get session token from cookie
  const sessionToken = request.cookies.get('session_token')?.value;
  const isAuthenticated = !!sessionToken;
  
  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Redirect non-authenticated users away from protected pages
  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Configure the paths that this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - api routes (API endpoints)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};
