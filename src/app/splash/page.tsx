import NewsletterSignup from '@/components/NewsletterSignup';

import Link from 'next/link';

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-brand-blue-light">
      {/* Login Button - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <Link 
          href="/login" 
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors bg-white/80 px-4 py-2 rounded-lg backdrop-blur"
        >
          Already a member? Login
        </Link>
      </div>

      {/* Hero Section - Above the Fold */}
      <section className="pt-16 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="mb-8">
            <span className="bg-white/80 text-gray-700 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 2,847+ SMB Buyers
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get Off-Market Deals Before They Hit the Brokers
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join 2,847+ buyers getting exclusive access to vetted businesses with real financials and seller financing — delivered weekly
          </p>

          {/* Email Signup Form */}
          <div className="mb-8">
            <NewsletterSignup />
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2">4.9/5 from readers</span>
            </div>
            <div className="text-gray-400">•</div>
            <div>100% Free Forever</div>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="py-8 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-gray-600 mb-6">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-700">Forbes</div>
            <div className="text-2xl font-bold text-gray-700">Inc.</div>
            <div className="text-2xl font-bold text-gray-700">WSJ</div>
            <div className="text-2xl font-bold text-gray-700">Business Insider</div>
            <div className="text-2xl font-bold text-gray-700">Entrepreneur</div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll Get Every Thursday
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">3-5 Vetted Deals</h3>
              <p className="text-gray-600">Hand-picked businesses with verified financials, not broker fluff</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Real Numbers</h3>
              <p className="text-gray-600">EBITDA, cash flow, and seller financing terms upfront</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Analysis</h3>
              <p className="text-gray-600">Our honest take on each deal's potential and red flags</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-brand-blue-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Buyers Are Saying
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Found my HVAC business through SMB Deal Sheet. The seller financing terms they highlighted saved me $200k in SBA fees."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Chen</div>
                  <div className="text-sm text-gray-600">Acquired 3 businesses</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Best $0 I spend each week. The analysis alone would cost thousands from a broker or consultant."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">PE Fund Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Recent Deal Example
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Manufacturing
              </span>
              <span className="text-gray-500 text-sm">This Week's Featured Deal</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Texas Metal Fabrication Shop - $1.2M EBITDA
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Asking Price</div>
                <div className="text-xl font-semibold text-gray-900">$3.6M</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Seller Financing</div>
                <div className="text-xl font-semibold text-green-600">40% at 6%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Years in Business</div>
                <div className="text-xl font-semibold text-gray-900">22 Years</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Employees</div>
                <div className="text-xl font-semibold text-gray-900">18 FTE</div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Strong regional player with 65% repeat business from oil & gas sector. Owner retiring but willing to stay on for 12-month transition...
            </p>
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 italic">Get full analysis + direct seller contact in the newsletter</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-brand-blue text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join 2,847+ Buyers Getting First Access
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Stop fighting over the same overpriced listings. Get deals before they're shopped around.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-8 max-w-md mx-auto">
            <NewsletterSignup />
            <p className="text-sm text-blue-100 mt-4">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <Link href="/login" className="text-white/80 hover:text-white text-sm underline">
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p>© 2025 SMB Deal Sheet. All rights reserved.</p>
          <p className="mt-2">
            Written by{' '}
            <a href="https://www.myleskameron.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
              Myles Kameron
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}