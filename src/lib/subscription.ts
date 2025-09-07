import { createClient } from '@/lib/supabase/server'

export async function checkSubscription(userId: string): Promise<boolean> {
  const supabase = await createClient()
  
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