'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function WelcomePage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkUserAndRedirect() {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // User is logged in, check for stored deal
        const returnToDeal = localStorage.getItem('returnToDeal')
        
        if (returnToDeal) {
          localStorage.removeItem('returnToDeal')
          router.push(`/deals/${returnToDeal}`)
        } else {
          router.push('/deals')
        }
      } else {
        // Not logged in, show welcome message
        setLoading(false)
      }
    }

    checkUserAndRedirect()
  }, [router, supabase.auth])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking your subscription...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to SMB Deal Sheet Pro! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Your subscription is now active. Please sign in to access all deals.
        </p>
        <Link
          href="/login"
          className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800"
        >
          Sign In to View Deals
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          You&apos;ll have full access to all deal details and broker contacts.
        </p>
      </div>
    </div>
  )
}