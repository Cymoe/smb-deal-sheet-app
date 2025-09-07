import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { checkSubscription } from '@/lib/subscription'
import UpgradeButton from '@/components/UpgradeButton'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: deal } = await supabase
    .from('deals')
    .select('business_type, city, state')
    .eq('slug', slug)
    .single()
  
  if (!deal) return {}
  
  return {
    title: `${deal.business_type} - ${deal.city}, ${deal.state} | SMB Deal Sheet`,
    description: `View details for this ${deal.business_type} opportunity in ${deal.city}, ${deal.state}.`
  }
}

export default async function DealPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>
  searchParams: Promise<{ upgraded?: string }>
}) {
  const { slug } = await params
  await searchParams // Just await it without destructuring
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  // Check subscription status if user is authenticated
  let hasSubscription = false
  if (user) {
    hasSubscription = await checkSubscription(user.id)
  }
  
  // Fetch the deal (available to all users)
  const { data: deal, error } = await supabase
    .from('deals')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  if (error || !deal) {
    notFound()
  }
  
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/deals" className="text-brand-blue hover:text-brand-blue-dark font-medium mb-4 inline-block">
            ← Back to all deals
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {deal.business_type}
          </h1>
          <p className="text-xl text-gray-600">
            {deal.city}, {deal.state}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Financial Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Asking Price</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(deal.asking_price)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Annual Cash Flow</p>
                  <p className="text-2xl font-bold text-green-700">{formatCurrency(deal.cash_flow)}</p>
                </div>
                
                {deal.ebitda && (
                  <div>
                    <p className="text-sm text-gray-600">EBITDA</p>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(deal.ebitda)}</p>
                  </div>
                )}
                
                {deal.revenue && (
                  <div>
                    <p className="text-sm text-gray-600">Annual Revenue</p>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(deal.revenue)}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Multiple</p>
                  <p className="text-xl font-semibold text-gray-900">{deal.multiple}x</p>
                </div>
                
                {deal.down_payment && (
                  <div>
                    <p className="text-sm text-gray-600">Down Payment (SBA)</p>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(deal.down_payment)}</p>
                  </div>
                )}
                
                {deal.established_year && (
                  <div>
                    <p className="text-sm text-gray-600">Years in Business</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {new Date().getFullYear() - deal.established_year} years
                    </p>
                  </div>
                )}
              </div>
              
              {/* Contact Broker Button */}
              <div className="mt-8">
                {user && hasSubscription ? (
                  <>
                    <a
                      href={`mailto:${deal.broker_email}?subject=Inquiry about ${deal.business_type} - ${deal.city}, ${deal.state}`}
                      className="w-full block text-center bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-dark transition-colors"
                    >
                      Contact Broker
                    </a>
                    {deal.broker_name && (
                      <p className="text-sm text-gray-600 text-center mt-2">
                        {deal.broker_name}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="relative">
                    <button
                      disabled
                      className="w-full block text-center bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Contact Broker
                    </button>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      {!user ? 'Sign in to contact broker' : 'Pro subscription required'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Deal Details */}
          <div className="lg:col-span-2 space-y-8 relative">
            {!user || !hasSubscription ? (
              <>
                {/* Blurred Content Preview */}
                <div className="space-y-8 filter blur-sm select-none pointer-events-none">
                  {/* Why This Deal is Interesting */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Why This Deal is Interesting
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      {deal.why_interesting.split('\n').slice(0, 2).map((line: string, index: number) => (
                        <p key={index} className="text-gray-700 mb-2">
                          {line.trim()}
                        </p>
                      ))}
                      <p className="text-gray-700 mb-2">• [Premium content available to members]</p>
                      <p className="text-gray-700 mb-2">• [Sign up to see full analysis]</p>
                    </div>
                  </div>
                  
                  {/* Real Talk */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      The Real Talk
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {deal.real_talk.substring(0, 100)}... [Full analysis available to members]
                    </p>
                  </div>
                </div>
                
                {/* Signup/Upgrade Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-[1px] rounded-lg">
                  <div className="text-center p-8 max-w-md">
                    {!user ? (
                      <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Want the Full Deal Details?
                        </h3>
                        <p className="text-gray-700 mb-6">
                          Join SMB Deal Sheet Pro to unlock:
                        </p>
                        <ul className="text-left space-y-2 mb-8 text-gray-700">
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Complete financial analysis
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Our honest &ldquo;Real Talk&rdquo; assessment
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Direct broker contact information
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Access to all deal listings
                          </li>
                        </ul>
                        <div className="space-y-3">
                          <Link
                            href={`/login?redirect=/deals/${deal.slug}&upgrade=true`}
                            className="block w-full bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-dark transition-colors"
                          >
                            Sign In to Subscribe
                          </Link>
                          <Link
                            href={`/signup?redirect=/deals/${deal.slug}&upgrade=true`}
                            className="block w-full text-gray-600 hover:text-gray-900 font-medium"
                          >
                            New here? Create an account
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Upgrade to Pro
                        </h3>
                        <p className="text-gray-700 mb-6">
                          You&apos;re signed in but need a Pro subscription to access full deal details.
                        </p>
                        <ul className="text-left space-y-2 mb-8 text-gray-700">
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Unlimited access to all deals
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Direct broker contact info
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Weekly curated deal alerts
                          </li>
                        </ul>
                        <div className="space-y-3">
                          <UpgradeButton dealSlug={deal.slug} />
                          <p className="text-sm text-gray-600">
                            Billed monthly. Cancel anytime.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Full Content for Authenticated Users */}
                {/* Why This Deal is Interesting */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Why This Deal is Interesting
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {deal.why_interesting.split('\n').map((line: string, index: number) => (
                      <p key={index} className="text-gray-700 mb-2">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Real Talk */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    The Real Talk
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {deal.real_talk}
                  </p>
                </div>
                
                {/* External Listing */}
                {deal.listing_url && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Full Listing Details
                    </h2>
                    <a
                      href={deal.listing_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:text-brand-blue-dark font-medium inline-flex items-center gap-2"
                    >
                      View on broker site
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
                
                {/* Deal Metadata */}
                <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
                  <p>Listed {new Date(deal.created_at).toLocaleDateString()}</p>
                  {deal.featured_in_newsletter && deal.newsletter_date && (
                    <p>Featured in newsletter on {new Date(deal.newsletter_date).toLocaleDateString()}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Want More Deals Like This?
          </h2>
          <p className="text-xl mb-8">
            Join our newsletter to get exclusive access to off-market businesses every week.
          </p>
          <a
            href="https://myleskameron.beehiiv.com/?close_draft_preview=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Subscribe to Deal Flow →
          </a>
        </div>
      </div>
    </div>
  )
}