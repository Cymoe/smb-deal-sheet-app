import { createClient } from '@/lib/supabase/client'

export async function checkSubscriptionClient(userId: string): Promise<boolean> {
  const supabase = createClient()
  
  // First check if this is a test account
  const { data: { user } } = await supabase.auth.getUser()
  
  // Add your test emails here
  const testEmails = ['myles@myleskameron.com']  // Replace with your actual email
  if (user?.email && testEmails.includes(user.email)) {
    console.log('Test account detected, granting access')
    return true
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', userId)
    .single()
  
  console.log('Checking subscription for user:', userId)
  console.log('Profile data:', profile)
  console.log('Error:', error)
  console.log('Subscription status:', profile?.subscription_status)
  
  return profile?.subscription_status === 'active'
}