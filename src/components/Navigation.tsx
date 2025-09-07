'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'
import { checkSubscriptionClient } from '@/lib/subscription-client'

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false) // Don't show loading state
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const supabase = createClient()
  
  // Check if we're on a deal page that requires payment
  const isDealPage = pathname?.startsWith('/deals/') && pathname !== '/deals'

  useEffect(() => {
    // Check current user and subscription
    const checkUserAndSubscription = async () => {
      console.log('Navigation: Starting auth check...')
      
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        console.log('Navigation: Auth response:', { user: user?.email, error })
        
        setUser(user)
        
        // Only check subscription if we have a user
        if (user) {
          try {
            const isSubscribed = await checkSubscriptionClient(user.id)
            console.log('Navigation: Subscription status:', isSubscribed)
            setHasSubscription(isSubscribed)
          } catch (error) {
            console.error('Navigation: Error checking subscription:', error)
            setHasSubscription(false)
          }
        }
      } catch (error) {
        console.error('Navigation: Unexpected error:', error)
        setUser(null)
      }
    }
    
    checkUserAndSubscription()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        try {
          const isSubscribed = await checkSubscriptionClient(session.user.id)
          setHasSubscription(isSubscribed)
        } catch (error) {
          console.error('Error checking subscription on auth change:', error)
          setHasSubscription(false)
        }
      } else {
        setHasSubscription(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    // Clear local state immediately for instant UI update
    setUser(null)
    setHasSubscription(false)
    setDropdownOpen(false)
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
    }
    
    // Force a hard refresh to clear all state
    window.location.href = '/'
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-lg sm:text-xl font-light text-gray-900 tracking-wide">
              SMB Deal Sheet
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {/* Hide Featured Deals on deal pages without subscription */}
              {(!isDealPage || hasSubscription) && (
                <Link href="/deals" className="text-gray-600 hover:text-gray-900 font-light transition-colors">
                  Featured Deals
                </Link>
              )}
              <a href="https://www.myleskameron.com/sell-your-business" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 font-light transition-colors">
                Sell Your Business
              </a>
              <a href="https://myleskameron.beehiiv.com/?close_draft_preview=true" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 font-light transition-colors">
                Newsletter
              </a>
              {user && (
                <Link href="/admin/deals" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-md font-light hover:bg-gray-800 transition-colors"
                >
                  <span>My Account</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    
                    <Link
                      href="/deals"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Featured Deals
                    </Link>
                    
                    <Link
                      href="/admin/deals"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          handleSignOut()
                          setDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 font-light transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-gray-900 text-white px-6 py-2.5 rounded-md font-light hover:bg-gray-800 transition-colors">
                  Join Pro
                </Link>
              </div>
            )}
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            {/* Hide Featured Deals on deal pages without subscription */}
            {(!isDealPage || hasSubscription) && (
              <Link
                href="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-gray-900 font-light py-2"
              >
                Featured Deals
              </Link>
            )}
            <a
              href="https://www.myleskameron.com/sell-your-business"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-gray-900 font-light py-2"
            >
              Sell Your Business
            </a>
            <a
              href="https://myleskameron.beehiiv.com/?close_draft_preview=true"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-600 hover:text-gray-900 font-light py-2"
            >
              Newsletter
            </a>
            {user && (
              <>
                <Link
                  href="/admin/deals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-600 hover:text-gray-900 font-light py-2"
                >
                  Admin
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 font-light py-2"
                >
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-600 hover:text-gray-900 font-light py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-gray-900 text-white px-4 py-2 rounded-md font-light text-center"
                >
                  Join Pro
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}