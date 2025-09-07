'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export default function TestSignOut() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  const handleDirectSignOut = async () => {
    console.log('Direct sign out...')
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Direct sign out error:', error)
    } else {
      console.log('Direct sign out successful')
      window.location.href = '/'
    }
  }

  const handleAPISignOut = async () => {
    console.log('API sign out...')
    const response = await fetch('/api/auth/signout', {
      method: 'POST'
    })
    const data = await response.json()
    console.log('API response:', data)
    if (data.success) {
      window.location.href = '/'
    }
  }

  const handleForceReload = () => {
    console.log('Force reload...')
    window.location.href = '/'
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Out Test Page</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p className="font-semibold">Current Status:</p>
        <p>{user ? `Signed in as: ${user.email}` : 'Not signed in'}</p>
      </div>

      {user ? (
        <div className="space-y-4">
          <button
            onClick={handleDirectSignOut}
            className="block w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Test Direct Sign Out (supabase.auth.signOut)
          </button>
          
          <button
            onClick={handleAPISignOut}
            className="block w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Test API Sign Out (/api/auth/signout)
          </button>
          
          <button
            onClick={handleForceReload}
            className="block w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Force Reload Home Page
          </button>
          
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <p className="text-sm">Open the browser console to see detailed logs.</p>
            <p className="text-sm mt-2">If sign out works, you should be redirected to the home page and no longer see the "My Account" button.</p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-50 rounded">
          <p>You are successfully signed out!</p>
          <a href="/login" className="text-blue-600 underline">Go to login</a>
        </div>
      )}
    </div>
  )
}
