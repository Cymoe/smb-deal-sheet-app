'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Deal } from '@/lib/supabase/types'
import { useRouter } from 'next/navigation'

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()


  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching deals:', error)
    } else {
      setDeals(data || [])
    }
    setLoading(false)
  }

  const updateDealStatus = async (dealId: string, status: Deal['status']) => {
    const { error } = await supabase
      .from('deals')
      .update({ status })
      .eq('id', dealId)

    if (error) {
      console.error('Error updating deal:', error)
    } else {
      fetchDeals()
    }
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Deals</h1>
          <button
            onClick={() => router.push('/admin/deals/new')}
            className="bg-brand-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-brand-blue-dark"
          >
            Add New Deal
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cash Flow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asking Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Newsletter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {deal.business_type}
                      </div>
                      <div className="text-sm text-gray-500">
                        Added {new Date(deal.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deal.city}, {deal.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(deal.cash_flow)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(deal.asking_price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={deal.status}
                      onChange={(e) => updateDealStatus(deal.id, e.target.value as Deal['status'])}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="under_loi">Under LOI</option>
                      <option value="sold">Sold</option>
                      <option value="expired">Expired</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {deal.featured_in_newsletter ? (
                      <span className="text-green-600">✓ Featured</span>
                    ) : (
                      <button
                        onClick={() => router.push(`/admin/deals/${deal.id}/newsletter`)}
                        className="text-blue-600 hover:underline"
                      >
                        Add to Newsletter
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => router.push(`/admin/deals/${deal.id}/edit`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => window.open(`/deals/${deal.slug || deal.id}`, '_blank')}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}