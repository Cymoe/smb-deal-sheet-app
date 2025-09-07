import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  
  // Sign out the user
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    )
  }
  
  return NextResponse.json(
    { success: true, message: 'Signed out successfully' },
    { status: 200 }
  )
}

export async function GET() {
  // Also support GET for easy testing
  return POST()
}
