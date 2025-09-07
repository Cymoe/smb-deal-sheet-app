'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SimpleAuthTest() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [testResult, setTestResult] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
    
    if (error) {
      setTestResult(`Error: ${error.message}`)
    } else if (user) {
      setTestResult('✅ Authentication is working!')
    } else {
      setTestResult('❌ Not authenticated')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Simple Auth Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Auth Status</h2>
          <p className="text-xl mb-4">{testResult}</p>
          
          {user ? (
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Provider:</strong> {user.app_metadata?.provider || 'Unknown'}</p>
              
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">You are not signed in.</p>
              <button
                onClick={handleSignIn}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>If you see "✅ Authentication is working!" above, your auth is set up correctly</li>
            <li>Try signing out and signing back in to test the full flow</li>
            <li>Navigate to different pages to ensure the session persists</li>
            <li>Check the /admin/deals page to verify protected routes work</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
