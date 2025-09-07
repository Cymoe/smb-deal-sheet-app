interface BeehiivSubscriber {
  id: string
  email: string
  status: string
  created: number
  subscription_tier?: string
  subscription_status?: string
  subscription_premium_tier_names?: string[]
  tags?: string[]
}

interface SubscriptionStatus {
  hasAccess: boolean
  tier: 'free' | 'pro'
}

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY!
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID!

// Simple in-memory cache
const subscriptionCache = new Map<string, { data: SubscriptionStatus; timestamp: number }>()
const CACHE_DURATION = 5 * 1000 // 5 seconds - shorter for testing

export async function checkBeehiivSubscription(email: string): Promise<SubscriptionStatus> {
  // Check cache first
  const cached = subscriptionCache.get(email)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    // Get subscriber details from Beehiiv
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions?email=${encodeURIComponent(email)}`,
      {
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('Beehiiv API error:', response.status)
      return { hasAccess: false, tier: 'free' }
    }

    const data = await response.json()
    
    // Check if subscriber exists and has paid subscription
    if (data.data && data.data.length > 0) {
      const subscriber = data.data[0] as BeehiivSubscriber
      
      // Check multiple ways Beehiiv might indicate paid status
      const isPaid = 
        subscriber.subscription_tier === 'premium' ||
        (subscriber.subscription_premium_tier_names?.includes('SMB Deal Sheet Pro') ?? false) ||
        (subscriber.tags?.includes('paid') ?? false) ||
        (subscriber.tags?.includes('premium') ?? false) ||
        (subscriber.tags?.includes('paid-subscriber') ?? false)
      
      const result = {
        hasAccess: isPaid,
        tier: isPaid ? 'pro' : 'free'
      } as SubscriptionStatus
      
      // Cache the result
      subscriptionCache.set(email, { data: result, timestamp: Date.now() })
      
      return result
    }

    const result = { hasAccess: false, tier: 'free' } as SubscriptionStatus
    subscriptionCache.set(email, { data: result, timestamp: Date.now() })
    return result
  } catch (error) {
    console.error('Error checking Beehiiv subscription:', error)
    return { hasAccess: false, tier: 'free' }
  }
}

export function getBeehiivCheckoutUrl(): string {
  // Direct link to the SMB Deal Sheet Pro upgrade page
  return 'https://smbdealsheet.com/upgrade'
}

export function clearSubscriptionCache(email?: string) {
  if (email) {
    subscriptionCache.delete(email)
  } else {
    subscriptionCache.clear()
  }
}