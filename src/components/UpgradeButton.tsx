'use client'

import { useState } from 'react'

interface UpgradeButtonProps {
  dealSlug: string
}

export default function UpgradeButton({ dealSlug }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  
  const handleUpgrade = async () => {
    try {
      setLoading(true)
      
      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dealSlug, billingPeriod }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Checkout failed:', response.status, errorData)
        alert(`Error: ${errorData.error}\nDetails: ${errorData.details}`)
        return
      }
      
      const { url, error } = await response.json()
      
      if (error) {
        console.error('Checkout error:', error)
        return
      }
      
      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4 text-sm">
        <button
          onClick={() => setBillingPeriod('monthly')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            billingPeriod === 'monthly'
              ? 'bg-brand-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingPeriod('annual')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            billingPeriod === 'annual'
              ? 'bg-brand-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Annual
          <span className="ml-1 text-xs font-normal">(Save $98)</span>
        </button>
      </div>
      
      {/* Subscribe Button */}
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="block w-full bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-dark transition-colors text-center disabled:opacity-50"
      >
        {loading ? 'Loading...' : (
          <>
            Subscribe for {billingPeriod === 'monthly' ? '$49/month' : '$490/year'} →
          </>
        )}
      </button>
    </div>
  )
}