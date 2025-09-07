import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { dealSlug, billingPeriod } = await request.json()
    
    // Select the appropriate price ID
    const priceId = billingPeriod === 'annual' 
      ? process.env.STRIPE_PRICE_ID_ANNUAL!
      : process.env.STRIPE_PRICE_ID_MONTHLY!
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/deals/${dealSlug}?upgraded=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/deals/${dealSlug}`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        dealSlug: dealSlug,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
    })
    
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error',
      type: 'unknown'
    }, { status: 500 })
  }
}