import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient(request, response)
  
  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = new URL('/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Auth routes when already logged in
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    const redirectUrl = new URL('/admin/deals', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/signup',
  ],
}