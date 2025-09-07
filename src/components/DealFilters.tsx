'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
]

export default function DealFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    state: searchParams.get('state') || '',
    minCashFlow: searchParams.get('min') || '',
    maxCashFlow: searchParams.get('max') || '',
  })

  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (filters.state) params.set('state', filters.state)
    if (filters.minCashFlow) params.set('min', filters.minCashFlow)
    if (filters.maxCashFlow) params.set('max', filters.maxCashFlow)
    
    router.push(`/deals?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({ state: '', minCashFlow: '', maxCashFlow: '' })
    router.push('/deals')
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filter Deals
      </h3>

      <div className="space-y-4">
        {/* State Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Cash Flow Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cash Flow Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minCashFlow}
              onChange={(e) => setFilters({ ...filters, minCashFlow: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxCashFlow}
              onChange={(e) => setFilters({ ...filters, maxCashFlow: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={applyFilters}
            className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Quick Stats
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Avg Multiple:</span>
            <span className="font-semibold text-gray-900">2.8x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">With Financing:</span>
            <span className="font-semibold text-gray-900">73%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Updated:</span>
            <span className="font-semibold text-gray-900">Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}