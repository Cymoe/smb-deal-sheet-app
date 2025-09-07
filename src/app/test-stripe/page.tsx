'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestStripePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')
  
  const testCheckout = async () => {
    try {
      setLoading(true)
      setResult('Testing checkout...')
      
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setResult('Error: Not logged in. Please sign in first.')
        return
      }
      
      // Test monthly checkout
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          dealSlug: 'test-deal',
          billingPeriod: 'monthly'
        }),
      })
      
      const data = await response.json()
      
      if (data.error) {
        setResult(`Error: ${data.error}`)
      } else if (data.url) {
        setResult(`Success! Checkout URL generated: ${data.url}`)
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Test Stripe Integration</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Environment Variables:</h2>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>✅ STRIPE_SECRET_KEY: {process.env.STRIPE_SECRET_KEY ? 'Set' : '❌ Missing'}</li>
              <li>✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Set' : '❌ Missing'}</li>
              <li>✅ STRIPE_PRICE_ID_MONTHLY: {process.env.STRIPE_PRICE_ID_MONTHLY ? 'Set' : '❌ Missing'}</li>
              <li>✅ STRIPE_PRICE_ID_ANNUAL: {process.env.STRIPE_PRICE_ID_ANNUAL ? 'Set' : '❌ Missing'}</li>
            </ul>
          </div>
          
          <div>
            <button
              onClick={testCheckout}
              disabled={loading}
              className="bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-brand-blue-dark disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Checkout API'}
            </button>
          </div>
          
          {result && (
            <div className={`p-4 rounded-lg ${result.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Next steps:</strong>
            <br />1. Make sure you&apos;re logged in
            <br />2. Click &quot;Test Checkout API&quot; to verify the integration
            <br />3. If successful, you&apos;ll see a Stripe checkout URL
            <br />4. For production, set up the webhook at /api/stripe/webhook
          </p>
        </div>
      </div>
    </div>
  )
}