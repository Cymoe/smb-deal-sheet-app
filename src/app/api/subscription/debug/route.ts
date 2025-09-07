import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY!
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID!

export async function GET() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    // Get subscriber details from Beehiiv
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions?email=${encodeURIComponent(user.email!)}`,
      {
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()
    
    return NextResponse.json({
      user_email: user.email,
      beehiiv_response: data,
      status: response.status,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check subscription',
      details: error
    }, { status: 500 })
  }
}