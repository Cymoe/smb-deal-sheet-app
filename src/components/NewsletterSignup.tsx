'use client'

export default function NewsletterSignup() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to Beehiiv subscription page
    window.open('https://myleskameron.beehiiv.com/?close_draft_preview=true', '_blank')
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white placeholder-gray-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-brand-blue-dark shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Sign Up Free
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Weekly deals delivered to your inbox. Cancel anytime.
      </p>
    </div>
  )
}