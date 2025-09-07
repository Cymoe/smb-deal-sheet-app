'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function OAuthRedirect() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const code = searchParams.get('code')
    
    if (code && typeof window !== 'undefined') {
      // If we're on production but meant to be on localhost (during dev)
      if (window.location.hostname === 'app.smbdealsheet.com' && 
          localStorage.getItem('auth_origin') === 'localhost') {
        // Redirect to localhost with the auth code
        localStorage.removeItem('auth_origin')
        window.location.href = `http://localhost:3000/auth/callback?code=${code}`
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  )
}