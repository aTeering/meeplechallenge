import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Protect all app pages by default and prevent logged-in users from seeing /auth pages.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow next internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml')
  ) {
    return NextResponse.next();
  }

  // Always allow NextAuth API routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Try reading JWT (if using jwt sessions) and also check database session cookie
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const sessionCookie =
    req.cookies.get('next-auth.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value;
  const isAuthed = Boolean(token || sessionCookie);

  // If user is authenticated and tries to access any /auth page, redirect to home
  if (pathname.startsWith('/auth')) {
    if (isAuthed) {
      const homeUrl = new URL('/', req.url);
      return NextResponse.redirect(homeUrl);
    }
    // Not authenticated -> allow access to /auth pages (e.g., /auth/login)
    return NextResponse.next();
  }

  // For non-auth pages: require authentication
  if (!isAuthed) {
    const loginUrl = new URL('/auth/login', req.url);
    // Preserve where the user was trying to go
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated and accessing a non-auth page
  return NextResponse.next();
}

// Apply to all routes except public files and api. We still guard in code for safety.
export const config = {
  matcher: [
    // Exclude api routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
