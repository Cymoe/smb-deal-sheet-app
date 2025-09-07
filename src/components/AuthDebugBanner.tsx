'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthDebugBanner() {
  const [authState, setAuthState] = useState<any>({
    loading: true,
    user: null,
    error: null
  })
  
  useEffect(() => {
    const supabase = createClient()
    
    const checkAuth = async () => {
      console.log('AuthDebugBanner: Checking auth...')
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        console.log('AuthDebugBanner: Auth result:', { user: user?.email, error })
        setAuthState({
          loading: false,
          user: user,
          error: error
        })
      } catch (error) {
        console.error('AuthDebugBanner: Unexpected error:', error)
        setAuthState({
          loading: false,
          user: null,
          error: error
        })
      }
    }
    
    checkAuth()
  }, [])
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 text-xs z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <strong>Auth Debug:</strong>{' '}
          {authState.loading ? (
            'Loading...'
          ) : authState.error ? (
            `Error: ${authState.error.message}`
          ) : authState.user ? (
            `Logged in as: ${authState.user.email}`
          ) : (
            'Not logged in'
          )}
        </div>
        <div>
          Navigation should show: {authState.loading ? 'Loading...' : authState.user ? 'My Account' : 'Sign In / Join Pro'}
        </div>
      </div>
    </div>
  )
}
