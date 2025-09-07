'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestAuthPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
      {user ? (
        <div>
          <p className="text-green-600 mb-2">✓ Authenticated</p>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(user, null, 2)}
          </pre>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p className="text-red-600 mb-4">✗ Not authenticated</p>
          <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
            Go to Login
          </a>
        </div>
      )}
    </div>
  )
}