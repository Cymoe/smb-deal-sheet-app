import { createClient } from '@/lib/supabase/server'
import { Deal } from '@/lib/supabase/types'
import DealCard from '@/components/DealCard'
import DealFilters from '@/components/DealFilters'
import SortDropdown from '@/components/SortDropdown'
import Link from 'next/link'

export const metadata = {
  title: 'Deal Flow - Current Business Acquisition Opportunities',
  description: 'Browse vetted businesses for sale with real financials. Updated weekly with new acquisition opportunities.',
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; min?: string; max?: string; sort?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams
  
  // Build query
  let query = supabase
    .from('deals')
    .select('*')
    .eq('status', 'active')
  
  // Apply filters
  if (params.state) {
    query = query.eq('state', params.state)
  }
  
  if (params.min) {
    query = query.gte('cash_flow', parseInt(params.min))
  }
  
  if (params.max) {
    query = query.lte('cash_flow', parseInt(params.max))
  }
  
  // Apply sorting
  const sortBy = params.sort || 'created_at'
  query = query.order(sortBy, { ascending: false })
  
  const { data: deals, error } = await query
  
  if (error) {
    console.error('Error fetching deals:', error)
    return <div>Error loading deals</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Deal Flow</h1>
          <p className="text-xl text-gray-300">
            Current businesses for sale. Real numbers. Updated weekly.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters */}
          <div className="lg:col-span-3">
            <DealFilters />
          </div>

          {/* Deals Grid */}
          <div className="lg:col-span-9">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {deals?.length || 0} Active Deals
              </h2>
              <SortDropdown defaultValue={params.sort || 'created_at'} />
            </div>

            {deals && deals.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No deals match your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Want Full Deal Details?
          </h2>
          <p className="text-xl mb-8">
            Sign up to access complete financials, broker contacts, and our expert analysis on every deal.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Join SMB Deal Sheet →
          </Link>
        </div>
      </div>
    </div>
  )
}