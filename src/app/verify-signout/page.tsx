'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function VerifySignOut() {
  const [status, setStatus] = useState<'checking' | 'signed-in' | 'signed-out'>('checking')
  const [email, setEmail] = useState<string | null>(null)
  
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.log('Auth check error:', error)
        setStatus('signed-out')
      } else if (user) {
        console.log('Still signed in as:', user.email)
        setStatus('signed-in')
        setEmail(user.email || null)
      } else {
        console.log('Successfully signed out')
        setStatus('signed-out')
      }
    }
    
    checkAuth()
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Sign Out Verification</h1>
        
        {status === 'checking' && (
          <p className="text-gray-600">Checking authentication status...</p>
        )}
        
        {status === 'signed-out' && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-800 font-semibold">✅ Successfully signed out!</p>
            </div>
            <p className="text-gray-600">You have been logged out of your account.</p>
            <Link 
              href="/login" 
              className="block w-full text-center bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Go to Login
            </Link>
          </div>
        )}
        
        {status === 'signed-in' && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800 font-semibold">❌ Sign out failed!</p>
            </div>
            <p className="text-gray-600">You are still signed in as: <strong>{email}</strong></p>
            <p className="text-sm text-gray-500">
              The sign out process did not complete successfully. 
              Try clicking the button below to force sign out.
            </p>
            <a 
              href="/api/force-signout" 
              className="block w-full text-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Force Sign Out
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
