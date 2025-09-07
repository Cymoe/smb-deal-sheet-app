'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewDealPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    business_type: '',
    city: '',
    state: '',
    revenue: '',
    cash_flow: '',
    ebitda: '',
    asking_price: '',
    down_payment: '',
    established_year: '',
    why_interesting: '',
    real_talk: '',
    listing_url: '',
    broker_name: '',
    broker_email: '',
    status: 'draft' as const,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Calculate multiple
    const cashFlow = parseFloat(formData.cash_flow)
    const askingPrice = parseFloat(formData.asking_price)
    const multiple = askingPrice / cashFlow

    // Create slug
    const slug = `${formData.business_type}-${formData.city}-${Date.now()}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')

    const { error } = await supabase.from('deals').insert({
      ...formData,
      revenue: formData.revenue ? parseFloat(formData.revenue) : null,
      cash_flow: cashFlow,
      ebitda: formData.ebitda ? parseFloat(formData.ebitda) : null,
      asking_price: askingPrice,
      down_payment: formData.down_payment ? parseFloat(formData.down_payment) : null,
      established_year: formData.established_year ? parseInt(formData.established_year) : null,
      multiple: Math.round(multiple * 10) / 10,
      slug,
    })

    if (error) {
      console.error('Error creating deal:', error)
      alert('Error creating deal')
    } else {
      router.push('/admin/deals')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Deal</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Type *
              </label>
              <input
                type="text"
                required
                value={formData.business_type}
                onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., HVAC Service Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Established Year
              </label>
              <input
                type="number"
                value={formData.established_year}
                onChange={(e) => setFormData({ ...formData, established_year: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Financial Info */}
            <div className="col-span-2 mt-6">
              <h2 className="text-xl font-semibold mb-4">Financial Information</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Revenue
              </label>
              <input
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cash Flow *
              </label>
              <input
                type="number"
                required
                value={formData.cash_flow}
                onChange={(e) => setFormData({ ...formData, cash_flow: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EBITDA
              </label>
              <input
                type="number"
                value={formData.ebitda}
                onChange={(e) => setFormData({ ...formData, ebitda: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Asking Price *
              </label>
              <input
                type="number"
                required
                value={formData.asking_price}
                onChange={(e) => setFormData({ ...formData, asking_price: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Down Payment (SBA)
              </label>
              <input
                type="number"
                value={formData.down_payment}
                onChange={(e) => setFormData({ ...formData, down_payment: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Deal Analysis */}
            <div className="col-span-2 mt-6">
              <h2 className="text-xl font-semibold mb-4">Deal Analysis</h2>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why This Deal Is Interesting
              </label>
              <textarea
                value={formData.why_interesting}
                onChange={(e) => setFormData({ ...formData, why_interesting: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="What makes this deal attractive? Recurring revenue, market position, etc."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                The Real Talk
              </label>
              <textarea
                value={formData.real_talk}
                onChange={(e) => setFormData({ ...formData, real_talk: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Your honest assessment - what's good, what needs work, who this is right for"
              />
            </div>

            {/* Broker Info */}
            <div className="col-span-2 mt-6">
              <h2 className="text-xl font-semibold mb-4">Listing Information</h2>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing URL
              </label>
              <input
                type="url"
                value={formData.listing_url}
                onChange={(e) => setFormData({ ...formData, listing_url: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Broker Name
              </label>
              <input
                type="text"
                value={formData.broker_name}
                onChange={(e) => setFormData({ ...formData, broker_name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Broker Email
              </label>
              <input
                type="email"
                value={formData.broker_email}
                onChange={(e) => setFormData({ ...formData, broker_email: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Deal'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/deals')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}