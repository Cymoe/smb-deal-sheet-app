'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function SortDropdown({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`/deals?${params.toString()}`)
  }

  return (
    <select
      className="border border-gray-300 rounded-md px-4 py-2"
      defaultValue={defaultValue}
      onChange={(e) => handleSortChange(e.target.value)}
    >
      <option value="created_at">Newest First</option>
      <option value="cash_flow">Highest Cash Flow</option>
      <option value="asking_price">Price: Low to High</option>
      <option value="multiple">Best Multiple</option>
    </select>
  )
}