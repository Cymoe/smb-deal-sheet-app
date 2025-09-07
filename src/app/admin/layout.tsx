import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// Define admin emails - add your email(s) here
const ADMIN_EMAILS = [
  '2mylescameron@gmail.com', // Your admin email
  // Add more admin emails as needed
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login?redirect=/admin/deals')
  }
  
  // Check if user is admin
  if (!ADMIN_EMAILS.includes(user.email || '')) {
    // Not an admin - redirect to regular deals page
    redirect('/deals')
  }
  
  return <>{children}</>
}