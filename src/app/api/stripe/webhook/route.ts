import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/admin'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!
  
  let event: Stripe.Event
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
  }
  
  const supabase = createClient()
  
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      
      if (userId) {
        console.log('Updating subscription for user:', userId)
        console.log('Customer ID:', session.customer)
        console.log('Subscription ID:', session.subscription)
        
        // Update user profile with subscription status
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            stripe_customer_id: session.customer as string,
            subscription_status: 'active',
            subscription_id: session.subscription as string,
            updated_at: new Date().toISOString(),
          })
          
        if (error) {
          console.error('Error updating profile:', error)
        } else {
          console.log('Successfully updated profile subscription')
        }
      } else {
        console.log('No userId in metadata')
      }
      break
    }
    
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const status = subscription.status === 'active' ? 'active' : 'inactive'
      
      // Update subscription status
      await supabase
        .from('profiles')
        .update({
          subscription_status: status,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_customer_id', subscription.customer as string)
      break
    }
  }
  
  return NextResponse.json({ received: true })
}