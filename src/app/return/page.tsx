'use client'

import { useEffect } from 'react'

export default function ReturnPage() {
  useEffect(() => {
    // Get the stored origin and redirect there
    const origin = localStorage.getItem('paymentOrigin') || window.location.origin
    const returnUrl = `${origin}/payment-success`
    
    // Clear the stored origin
    localStorage.removeItem('paymentOrigin')
    
    // Redirect to the correct origin
    window.location.href = returnUrl
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}