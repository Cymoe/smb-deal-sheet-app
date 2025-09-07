import { Deal } from '@/lib/supabase/types'
import Link from 'next/link'

interface DealCardProps {
  deal: Deal
}

export default function DealCard({ deal }: DealCardProps) {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {deal.business_type}
        </h3>
        <p className="text-gray-600">
          {deal.city}, {deal.state}
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Asking Price:</span>
          <span className="font-semibold text-gray-900">{formatCurrency(deal.asking_price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Cash Flow:</span>
          <span className="font-semibold text-green-700">
            {formatCurrency(deal.cash_flow)}
          </span>
        </div>
        {deal.multiple && (
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Multiple:</span>
            <span className="font-semibold text-gray-900">{deal.multiple}x</span>
          </div>
        )}
        {deal.down_payment && (
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Down (SBA):</span>
            <span className="font-semibold text-gray-900">{formatCurrency(deal.down_payment)}</span>
          </div>
        )}
      </div>


      <div className="flex justify-between items-center">
        <Link
          href={`/deals/${deal.slug || deal.id}`}
          className="text-desert-brown font-medium hover:text-desert-brown-light transition-colors"
        >
          View Details →
        </Link>
        
        <span className="text-sm text-gray-500">
          Added {new Date(deal.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}