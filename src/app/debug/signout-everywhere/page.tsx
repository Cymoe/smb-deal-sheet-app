'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutEverywhere() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const signOutEverywhere = async () => {
      // Sign out from all sessions
      await supabase.auth.signOut({ scope: 'global' })
      
      // Clear all local storage
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }
      
      alert('Signed out from all sessions! You can now try signing in again.')
      router.push('/login')
    }

    signOutEverywhere()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Signing out from all sessions...</p>
    </div>
  )
}