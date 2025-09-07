'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getBeehiivCheckoutUrl } from '@/lib/beehiiv'

function UpgradeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const returnPath = searchParams.get('return')

  useEffect(() => {
    async function handleUpgrade() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Not signed in, redirect to login
        router.push(`/login?redirect=${encodeURIComponent(returnPath || '/deals')}&upgrade=true`)
        return
      }
      
      // Store the return path for after payment
      if (returnPath) {
        localStorage.setItem('dealAfterPayment', returnPath)
      }
      
      // Store the current origin for return
      localStorage.setItem('paymentOrigin', window.location.origin)
      
      // Redirect to Beehiiv checkout
      window.location.href = getBeehiivCheckoutUrl()
    }
    
    handleUpgrade()
  }, [returnPath, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to checkout...</p>
      </div>
    </div>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <UpgradeContent />
    </Suspense>
  )
}