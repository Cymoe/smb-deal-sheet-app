import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  try {
    // Get the last checkout session
    const sessions = await stripe.checkout.sessions.list({
      limit: 1,
    })
    
    if (sessions.data.length === 0) {
      return NextResponse.json({ error: 'No sessions found' })
    }
    
    const session = sessions.data[0]
    const supabase = createClient()
    
    // Check if we have the user ID in metadata
    const userId = session.metadata?.userId
    
    // Check current profile status
    let profileStatus = null
    if (userId) {
      const { data } = await supabase
        .from('profiles')
        .select('subscription_status, stripe_customer_id')
        .eq('id', userId)
        .single()
      
      profileStatus = data
    }
    
    return NextResponse.json({
      session: {
        id: session.id,
        status: session.status,
        metadata: session.metadata,
        customer: session.customer,
        subscription: session.subscription,
      },
      userId,
      profileStatus,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'Set' : 'Not set',
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      type: error.type,
    })
  }
}