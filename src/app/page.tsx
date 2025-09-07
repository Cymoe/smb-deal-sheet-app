import Link from "next/link";
import { createClient } from '@/lib/supabase/server';
import HomepageDeals from "@/components/HomepageDeals";

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch all active deals
  const { data: allDeals } = await supabase
    .from('deals')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  
  const deals = allDeals || [];
  const initialDeals = deals.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 sm:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-4 sm:mb-6 text-gray-900 leading-tight">
              The Deals Worth Buying <br className="hidden sm:block" />
              Don&apos;t Make It to Market
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-600 font-light max-w-2xl">
              Get exclusive access to off-market businesses with real financials, seller financing terms, and our candid analysis on each deal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto text-center px-8 sm:px-10 py-3.5 bg-gray-900 text-white rounded-md font-light tracking-wide hover:bg-gray-800 transition-colors"
              >
                Join Pro
              </Link>
              <Link 
                href="/login" 
                className="text-gray-500 hover:text-gray-700 font-light transition-colors text-center sm:text-left self-center"
              >
                Already a member? Sign in
              </Link>
            </div>
            <div className="mt-8 text-xs text-gray-500">
              Written by{' '}
              <a href="https://www.myleskameron.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-desert-brown hover:text-desert-brown-light transition-colors">
                Myles Kameron
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomepageDeals initialDeals={initialDeals} allDeals={deals} />
        </div>
      </section>


      {/* Author Footer */}
      <footer className="bg-white py-8 sm:py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 text-center sm:text-left">
              Written by{' '}
              <a href="https://www.myleskameron.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-desert-brown hover:text-desert-brown-light transition-colors">
                Myles Kameron
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Connect</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    <circle cx="12" cy="12" r="3.5"/>
                    <circle cx="18.5" cy="5.5" r="1.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}