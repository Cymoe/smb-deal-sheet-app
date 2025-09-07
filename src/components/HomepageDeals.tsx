'use client'

import { useState } from 'react'
import DealCard from '@/components/DealCard'
import { Deal } from '@/lib/supabase/types'
import Link from 'next/link'

interface HomepageDealsProps {
  initialDeals: Deal[]
  allDeals: Deal[]
}

export default function HomepageDeals({ initialDeals, allDeals }: HomepageDealsProps) {
  const [showAll, setShowAll] = useState(false)
  const dealsToShow = showAll ? allDeals : initialDeals
  const hasMoreDeals = allDeals.length > initialDeals.length

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Deals</h2>
        <div className="flex gap-4">
          <Link href="/deals" className="text-desert-brown hover:text-desert-brown-light font-light transition-colors">
            View All Deals →
          </Link>
        </div>
      </div>

      {/* Deals Grid */}
      {dealsToShow.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dealsToShow.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMoreDeals && !showAll && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="text-desert-brown hover:text-desert-brown-light font-light underline underline-offset-4 transition-colors"
              >
                Load More Deals ({allDeals.length - initialDeals.length} more)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No active deals available right now.</p>
          <p className="text-gray-600 mt-2">Check back soon or sign up for our newsletter to get notified of new deals.</p>
        </div>
      )}
    </>
  )
}