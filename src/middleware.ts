import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth')?.value || '';
  if (path.startsWith('/dashboard')  && !token) {
    return NextResponse.redirect(new URL('/404', request.nextUrl));
  } else if (path === '/admin' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
  else if (path === '/reset' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  } else if (path.startsWith('/resetpassword') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin',
    '/reset',
    '/resetpassword/:path*'
  ],
}