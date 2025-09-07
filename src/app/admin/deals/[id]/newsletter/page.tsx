'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Deal } from '@/lib/supabase/types'
import { useRouter } from 'next/navigation'

export default function NewsletterExportPage({ params }: { params: { id: string } }) {
  const [deal, setDeal] = useState<Deal | null>(null)
  const [newsletterHtml, setNewsletterHtml] = useState('')
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchDeal()
  }, [params.id])

  const fetchDeal = async () => {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching deal:', error)
    } else {
      setDeal(data)
      generateNewsletterHtml(data)
    }
  }

  const generateNewsletterHtml = (deal: Deal) => {
    const formatCurrency = (num: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num)
    }

    const html = `
<div style="background: #f8f9fa; border-left: 4px solid #000000; padding: 20px; margin: 0 0 24px 0; border-radius: 0 8px 8px 0;">
  <h3 style="font-size: 18px; font-weight: 600; color: #333; margin: 0 0 12px 0;">
    ${deal.business_type} - ${deal.city}, ${deal.state}
  </h3>
  <p style="color: #404040; font-size: 16px; line-height: 24px; margin-bottom: 12px;">
    <strong>The Numbers:</strong><br>
    ${deal.revenue ? `• Revenue: ${formatCurrency(deal.revenue)}<br>` : ''}
    • Cash Flow: ${formatCurrency(deal.cash_flow)}<br>
    • Asking: ${formatCurrency(deal.asking_price)} (${deal.multiple || Math.round(deal.asking_price / deal.cash_flow * 10) / 10}x multiple)<br>
    ${deal.down_payment ? `• Down Payment: ${formatCurrency(deal.down_payment)} with SBA` : ''}
  </p>
  ${deal.why_interesting ? `
  <p style="color: #404040; font-size: 16px; line-height: 24px; margin-bottom: 12px;">
    <strong>Why This Deal:</strong><br>
    ${deal.why_interesting}
  </p>` : ''}
  ${deal.real_talk ? `
  <p style="color: #666; font-size: 14px; line-height: 20px; margin-bottom: 12px;">
    <strong>The Real Talk:</strong> ${deal.real_talk}
  </p>` : ''}
  <div style="text-align: center; margin-top: 16px;">
    <a href="https://myleskameron.com/deals/${deal.slug || deal.id}" style="color: #000000; text-decoration: none; font-weight: 600; font-size: 14px;">
      Get Full Details →
    </a>
  </div>
</div>`

    setNewsletterHtml(html.trim())
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newsletterHtml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const markAsFeatured = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ 
        featured_in_newsletter: true,
        newsletter_date: new Date().toISOString().split('T')[0]
      })
      .eq('id', params.id)

    if (!error) {
      alert('Deal marked as featured in newsletter!')
      router.push('/admin/deals')
    }
  }

  if (!deal) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Export Deal for Newsletter</h1>

        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4">
            {deal.business_type} - {deal.city}, {deal.state}
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Newsletter HTML (Copy this into Beehiiv)
            </label>
            <div className="relative">
              <textarea
                value={newsletterHtml}
                readOnly
                rows={15}
                className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200"
              >
                {copied ? '✓ Copied!' : 'Copy HTML'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div 
              className="border border-gray-200 rounded-md p-4"
              dangerouslySetInnerHTML={{ __html: newsletterHtml }}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={markAsFeatured}
              className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700"
            >
              Mark as Featured
            </button>
            <button
              onClick={() => router.push('/admin/deals')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-300"
            >
              Back to Deals
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}