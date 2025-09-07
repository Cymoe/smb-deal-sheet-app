import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('Force signout endpoint called')
  
  try {
    // Get server-side Supabase client
    const supabase = await createClient()
    
    // Attempt to sign out
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Server signout error:', error)
    }
    
    // Clear all auth-related cookies
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    
    // Create response with cleared cookies
    const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
    
    // Clear each cookie
    allCookies.forEach(cookie => {
      if (cookie.name.includes('supabase') || cookie.name.includes('auth')) {
        response.cookies.set(cookie.name, '', {
          expires: new Date(0),
          path: '/',
        })
      }
    })
    
    console.log('Force signout complete, redirecting to home')
    return response
    
  } catch (error) {
    console.error('Force signout error:', error)
    // Even on error, redirect to home
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
  }
}
