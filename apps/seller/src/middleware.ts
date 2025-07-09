import SessionManager from '@repo/ui/lib/SessionManager';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/'];
const publicRoutes = ['/sign-in', '/sign-up', '/verify-email'];

export default async function middleware(req: NextRequest) {
  const utils = new SessionManager();
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('reuT2k1z8')?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  // If user is authenticated and tries to access public routes, redirect to home
  if (isPublicRoute && session?.id) {
    if (session?.role === 'seller') {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
