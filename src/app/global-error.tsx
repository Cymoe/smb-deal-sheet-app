'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-6">An unexpected error occurred. Please try again.</p>
            <button
              onClick={() => reset()}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}