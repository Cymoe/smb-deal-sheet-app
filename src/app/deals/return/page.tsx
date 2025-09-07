import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DealsReturnPage({
  searchParams
}: {
  searchParams: Promise<{ deal?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    // Not authenticated, send to login with deal info
    const dealParam = params.deal ? `&deal=${params.deal}` : ''
    redirect(`/login?upgraded=true${dealParam}`)
  }
  
  // Authenticated, redirect to specific deal or deals list
  if (params.deal) {
    redirect(`/deals/${params.deal}`)
  } else {
    redirect('/deals')
  }
}