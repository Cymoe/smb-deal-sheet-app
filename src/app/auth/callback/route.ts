import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirect') || '/deals'
  const fromLocal = requestUrl.searchParams.get('from_local') === 'true'
  
  // Default to current origin
  let origin = requestUrl.origin
  
  // If this is production but the auth was initiated from localhost
  if (process.env.NODE_ENV === 'production' && fromLocal) {
    // Check if we should redirect back to localhost
    const localOrigin = requestUrl.searchParams.get('local_origin')
    if (localOrigin) {
      origin = localOrigin
    }
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(new URL('/login?error=auth_failed', origin))
    }
  }

  // Redirect to the specified page or default to deals
  return NextResponse.redirect(new URL(redirectTo, origin))
}