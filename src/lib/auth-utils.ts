/**
 * Auth utility functions for handling dynamic redirect URLs
 * between localhost and production environments
 */

/**
 * Gets the base URL for the application based on environment
 */
export function getBaseURL(): string {
  // In production, use the Vercel URL or fallback to the known production URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL || 
           process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` :
           'https://app.smbdealsheet.com'
  }
  
  // In development, always use localhost
  return 'http://localhost:3000'
}

/**
 * Gets the auth redirect URL for OAuth callbacks
 * This function should be used in client-side code
 */
export function getAuthRedirectURL(): string {
  if (typeof window === 'undefined') {
    return getBaseURL() + '/auth/callback'
  }
  
  // Use the current window origin for flexibility
  // This allows the app to work on preview deployments too
  return `${window.location.origin}/auth/callback`
}

/**
 * Gets the final redirect URL after auth based on environment
 * Used to handle the case where Supabase dashboard points to production
 * but we're developing locally
 */
export function getFinalAuthRedirect(redirectTo?: string): string {
  const baseURL = getBaseURL()
  return redirectTo ? `${baseURL}${redirectTo}` : `${baseURL}/deals`
}

/**
 * Checks if we're in a development environment trying to auth
 * This helps detect when we need to redirect from production back to localhost
 */
export function isLocalDevelopment(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check if we're on localhost
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1'
}

/**
 * Sets a flag in sessionStorage to indicate auth was initiated from localhost
 * This helps the production callback know to redirect back to localhost
 */
export function markLocalAuthAttempt(): void {
  if (typeof window !== 'undefined' && isLocalDevelopment()) {
    sessionStorage.setItem('auth_redirect_origin', 'localhost')
  }
}

/**
 * Checks if auth was initiated from localhost (used in production callback)
 */
export function wasAuthFromLocalhost(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('auth_redirect_origin') === 'localhost'
}

/**
 * Clears the local auth flag
 */
export function clearLocalAuthFlag(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('auth_redirect_origin')
  }
}
