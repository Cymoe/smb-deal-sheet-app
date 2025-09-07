export interface BeehiivPost {
  id: string
  title: string
  subtitle?: string
  content_html?: string
  content_text?: string
  slug: string
  status: string
  publish_date: string
  thumbnail_url?: string
  web_url: string
  authors: Array<{
    name: string
    profile_picture?: string
  }>
  stats?: {
    views: number
    clicks: number
  }
}

export async function getBeehiivPosts(): Promise<BeehiivPost[]> {
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    console.error('Missing Beehiiv API credentials')
    return []
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts?status=published`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch posts:', response.status)
      return []
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching Beehiiv posts:', error)
    return []
  }
}

export async function subscribeToNewsletter(email: string) {
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    throw new Error('Missing Beehiiv API credentials')
  }

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to subscribe')
  }

  return await response.json()
}