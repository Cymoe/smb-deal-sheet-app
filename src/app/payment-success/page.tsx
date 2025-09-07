'use client'

import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

function PaymentSuccessContent() {
  const [status, setStatus] = useState<'checking' | 'signing-in' | 'redirecting'>('checking')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function handleReturn() {
      console.log('Payment success page loaded')
      
      // Check if user is signed in
      const { data: { user } } = await supabase.auth.getUser()
      console.log('User check:', user?.email)
      
      if (!user) {
        // Not signed in after payment - this is expected
        console.log('User not signed in, redirecting to login')
        setStatus('signing-in')
        
        // Get the stored deal path
        const dealPath = localStorage.getItem('dealAfterPayment')
        const redirectPath = dealPath || '/deals'
        console.log('Stored deal path:', dealPath)
        
        // Redirect to login with the deal as final destination
        setTimeout(() => {
          router.push(`/login?redirect=${encodeURIComponent(redirectPath)}&upgraded=true`)
        }, 1000)
      } else {
        // User is signed in, check for stored deal
        console.log('User is signed in')
        setStatus('redirecting')
        const dealPath = localStorage.getItem('dealAfterPayment')
        console.log('Stored deal path:', dealPath)
        
        if (dealPath) {
          localStorage.removeItem('dealAfterPayment')
          setTimeout(() => {
            router.push(dealPath)
          }, 1000)
        } else {
          setTimeout(() => {
            router.push('/deals')
          }, 1000)
        }
      }
    }

    handleReturn()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          {status === 'checking' && 'Verifying your subscription...'}
          {status === 'signing-in' && 'Redirecting to sign in...'}
          {status === 'redirecting' && 'Taking you to your deal...'}
        </p>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}