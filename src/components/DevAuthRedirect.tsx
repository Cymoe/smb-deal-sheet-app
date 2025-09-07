'use client'

import { useEffect } from 'react'

export default function DevAuthRedirect() {
  useEffect(() => {
    // Only run in development and on the production domain
    if (process.env.NODE_ENV === 'development' && 
        typeof window !== 'undefined' && 
        window.location.hostname === 'app.smbdealsheet.com') {
      
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      
      if (code) {
        // Redirect to localhost with the auth code
        window.location.href = `http://localhost:3000/auth/callback?code=${code}`
      }
    }
  }, [])

  return null
}