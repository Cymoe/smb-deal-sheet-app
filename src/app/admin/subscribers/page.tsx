'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Subscriber {
  id: string
  email: string
  subscription_status: string
  stripe_customer_id: string | null
  created_at: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, subscription_status, stripe_customer_id, created_at')
      .eq('subscription_status', 'active')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setSubscribers(data)
    }
    setLoading(false)
  }

  const deactivateSubscription = async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        subscription_status: 'inactive',
        stripe_customer_id: null,
        subscription_id: null
      })
      .eq('id', userId)

    if (!error) {
      fetchSubscribers()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Active Subscribers</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscribers.map((sub) => (
              <tr key={sub.id}>
                <td className="px-6 py-4 text-sm">{sub.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    {sub.subscription_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {sub.stripe_customer_id || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => deactivateSubscription(sub.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {subscribers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No active subscribers found
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>Note: This only updates the database. To fully cancel in Stripe:</p>
        <ol className="list-decimal ml-6 mt-2">
          <li>Go to Stripe Dashboard → Customers</li>
          <li>Find the customer by ID</li>
          <li>Cancel their subscription</li>
        </ol>
      </div>
    </div>
  )
}