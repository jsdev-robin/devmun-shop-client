import SessionManager from '@repo/ui/lib/SessionManager';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const route = {
  path: {
    protected: {
      admin: ['/admin/overview'],
      seller: ['/seller/overview'],
    },
    public: ['/sign-in', '/sign-up', '/verify-email'],
  },
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const utils = new SessionManager();

  // Check for path routes
  const isProtectedRoute =
    route.path.protected.admin.includes(path) ||
    route.path.protected.seller.includes(path);
  const ispathPublicRoute = route.path.public.includes(path);

  // Decrypt the path session
  const cookie = (await cookies()).get('reuT2k1z8')?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);

  // Handle path routes
  if (isProtectedRoute && !session) {
    await utils.deleteSession('aeuT2k1z9');
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (ispathPublicRoute && session) {
    const pathPath =
      session.role === 'admin' ? '/admin/overview' : '/seller/overview';

    if (!req.nextUrl.pathname.startsWith(pathPath)) {
      return NextResponse.redirect(new URL(pathPath, req.nextUrl));
    }
  }

  // Check role-based access for path protected routes
  if (session) {
    if (route.path.protected.admin.includes(path) && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/seller/overview', req.nextUrl));
    }

    if (
      route.path.protected.seller.includes(path) &&
      session.role !== 'seller'
    ) {
      return NextResponse.redirect(new URL('/admin/overview', req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
