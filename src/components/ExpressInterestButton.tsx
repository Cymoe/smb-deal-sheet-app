'use client'

import { useState } from 'react'
import BuyerInterestModal from './BuyerInterestModal'

interface ExpressInterestButtonProps {
  dealId: string
  dealTitle: string
}

export default function ExpressInterestButton({ dealId, dealTitle }: ExpressInterestButtonProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          console.log('Express Interest button clicked')
          setModalOpen(true)
        }}
        className="w-full block text-center bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
      >
        Express Interest
      </button>
      
      <BuyerInterestModal
        dealId={dealId}
        dealTitle={dealTitle}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}