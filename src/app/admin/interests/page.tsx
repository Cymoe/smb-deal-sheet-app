'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface BuyerInterest {
  id: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string | null
  message: string | null
  budget_range: string | null
  timeline: string | null
  experience_level: string | null
  status: string
  created_at: string
  deal: {
    business_type: string
    city: string
    state: string
    asking_price: number
  }
}

export default function InterestsPage() {
  const [interests, setInterests] = useState<BuyerInterest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const supabase = createClient()

  useEffect(() => {
    fetchInterests()
  }, [filter])

  const fetchInterests = async () => {
    let query = supabase
      .from('buyer_interests')
      .select(`
        *,
        deal:deals (
          business_type,
          city,
          state,
          asking_price
        )
      `)
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data, error } = await query

    if (!error && data) {
      setInterests(data as BuyerInterest[])
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('buyer_interests')
      .update({ status })
      .eq('id', id)

    if (!error) {
      fetchInterests()
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Deal', 'Budget', 'Timeline', 'Experience', 'Message', 'Date']
    const rows = interests.map(interest => [
      interest.buyer_name,
      interest.buyer_email,
      interest.buyer_phone || '',
      `${interest.deal.business_type} - ${interest.deal.city}, ${interest.deal.state}`,
      interest.budget_range || '',
      interest.timeline || '',
      interest.experience_level || '',
      interest.message || '',
      new Date(interest.created_at).toLocaleDateString()
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `buyer-interests-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Buyer Interests</h1>
        <button
          onClick={exportToCSV}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Export CSV
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-brand-blue text-white' : 'bg-gray-200'}`}
        >
          All ({interests.length})
        </button>
        <button
          onClick={() => setFilter('new')}
          className={`px-4 py-2 rounded ${filter === 'new' ? 'bg-brand-blue text-white' : 'bg-gray-200'}`}
        >
          New
        </button>
        <button
          onClick={() => setFilter('contacted')}
          className={`px-4 py-2 rounded ${filter === 'contacted' ? 'bg-brand-blue text-white' : 'bg-gray-200'}`}
        >
          Contacted
        </button>
        <button
          onClick={() => setFilter('qualified')}
          className={`px-4 py-2 rounded ${filter === 'qualified' ? 'bg-brand-blue text-white' : 'bg-gray-200'}`}
        >
          Qualified
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {interests.map((interest) => (
              <tr key={interest.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(interest.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{interest.buyer_name}</div>
                  <div className="text-sm text-gray-500">{interest.buyer_email}</div>
                  {interest.buyer_phone && (
                    <div className="text-sm text-gray-500">{interest.buyer_phone}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {interest.deal.business_type}
                  </div>
                  <div className="text-sm text-gray-500">
                    {interest.deal.city}, {interest.deal.state}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {interest.budget_range || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {interest.timeline || '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <select
                    value={interest.status}
                    onChange={(e) => updateStatus(interest.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="not_qualified">Not Qualified</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm">
                  <a
                    href={`mailto:${interest.buyer_email}`}
                    className="text-brand-blue hover:text-brand-blue-dark"
                  >
                    Email
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {interests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No buyer interests found
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Interests:</span>
            <span className="font-semibold ml-2">{interests.length}</span>
          </div>
          <div>
            <span className="text-gray-600">New This Week:</span>
            <span className="font-semibold ml-2">
              {interests.filter(i => {
                const date = new Date(i.created_at)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return date > weekAgo
              }).length}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Qualified Buyers:</span>
            <span className="font-semibold ml-2">
              {interests.filter(i => i.status === 'qualified').length}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/admin/deals"
        className="inline-block mt-4 text-brand-blue hover:text-brand-blue-dark"
      >
        ← Back to Deals
      </Link>
    </div>
  )
}