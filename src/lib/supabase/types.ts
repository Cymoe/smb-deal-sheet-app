export interface Deal {
  id: string
  business_type: string
  city: string
  state: string
  revenue?: number
  cash_flow: number
  ebitda?: number
  asking_price: number
  down_payment?: number
  established_year?: number
  slug?: string
  why_interesting: string
  real_talk: string
  listing_url?: string
  broker_name?: string
  broker_email?: string
  status: 'draft' | 'active' | 'sold' | 'paused'
  featured_in_newsletter: boolean
  newsletter_date?: string
  multiple?: number
  created_at: string
  updated_at: string
}