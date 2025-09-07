'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [authUrl, setAuthUrl] = useState('')
  const supabase = createClient()

  useEffect(() => {
    // Gather debug information
    const info = {
      origin: window.location.origin,
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      port: window.location.port || '(default)',
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '(not set)',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '(not set)',
    }
    setDebugInfo(info)
  }, [])

  const testGoogleAuth = async () => {
    setLoading(true)
    
    const redirectUrl = `${window.location.origin}/auth/callback`
    setAuthUrl(redirectUrl)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true // This prevents actual redirect so we can see the URL
      }
    })

    if (error) {
      console.error('Auth error:', error)
      setDebugInfo(prev => ({ ...prev, error: error.message }))
    } else if (data?.url) {
      setDebugInfo(prev => ({ ...prev, generatedAuthUrl: data.url }))
      
      // Extract the redirect_uri from the auth URL
      try {
        const authUrl = new URL(data.url)
        const redirectUri = authUrl.searchParams.get('redirect_uri')
        setDebugInfo(prev => ({ ...prev, actualRedirectUri: redirectUri }))
      } catch (e) {
        console.error('Error parsing auth URL:', e)
      }
    }
    
    setLoading(false)
  }

  const checkSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      setDebugInfo(prev => ({ ...prev, sessionError: error.message }))
    } else {
      setDebugInfo(prev => ({ ...prev, session: session ? 'Active' : 'None' }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Auth Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Environment Info</h2>
          <div className="space-y-2 font-mono text-sm">
            <div><strong>Origin:</strong> {debugInfo.origin}</div>
            <div><strong>Hostname:</strong> {debugInfo.hostname}</div>
            <div><strong>Protocol:</strong> {debugInfo.protocol}</div>
            <div><strong>Port:</strong> {debugInfo.port}</div>
            <div><strong>Node Env:</strong> {debugInfo.nodeEnv}</div>
            <div><strong>NEXT_PUBLIC_SITE_URL:</strong> {debugInfo.siteUrl}</div>
            <div><strong>Supabase URL:</strong> {debugInfo.supabaseUrl}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Auth Test</h2>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Expected Redirect URL:</p>
            <code className="bg-gray-100 p-2 rounded block text-sm">{authUrl || `${debugInfo.origin}/auth/callback`}</code>
          </div>

          {debugInfo.actualRedirectUri && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Actual Redirect URI (from Supabase):</p>
              <code className="bg-gray-100 p-2 rounded block text-sm break-all">{debugInfo.actualRedirectUri}</code>
            </div>
          )}

          {debugInfo.generatedAuthUrl && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Full Auth URL:</p>
              <code className="bg-gray-100 p-2 rounded block text-xs break-all">{debugInfo.generatedAuthUrl}</code>
            </div>
          )}

          {debugInfo.error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
              <strong>Error:</strong> {debugInfo.error}
            </div>
          )}

          {debugInfo.session && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Session Status:</p>
              <code className="bg-gray-100 p-2 rounded block text-sm">{debugInfo.session}</code>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={testGoogleAuth}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Google Auth (No Redirect)'}
            </button>
            
            <button
              onClick={checkSession}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Check Session
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">Required Supabase Configuration</h3>
          <p className="text-sm text-yellow-800 mb-2">Add these URLs to your Supabase Dashboard → Authentication → URL Configuration → Redirect URLs:</p>
          <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
            <li><code>http://localhost:3000/auth/callback</code></li>
            <li><code>https://app.smbdealsheet.com/auth/callback</code></li>
          </ul>
          <p className="text-sm text-yellow-800 mt-3">
            The redirect URL must match EXACTLY what's shown in "Expected Redirect URL" above.
          </p>
        </div>
      </div>
    </div>
  )
}
