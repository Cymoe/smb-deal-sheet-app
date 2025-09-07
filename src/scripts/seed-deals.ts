import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Create Supabase client for seeding
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('Has service key:', !!supabaseServiceKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const sampleDeals = [
  {
    business_type: "HVAC Service Company",
    city: "Austin",
    state: "TX",
    revenue: 4200000,
    cash_flow: 980000,
    ebitda: 1050000,
    asking_price: 3500000,
    down_payment: 700000,
    established_year: 2005,
    slug: "austin-hvac-service-company",
    why_interesting: "• 18-year track record with 40% commercial contracts\n• Strong margins at 25% EBITDA\n• Owner retiring but willing to stay for 18-month transition\n• Equipment recently upgraded (2022)\n• Recurring maintenance contracts worth $1.2M annually",
    real_talk: "The good: Rock-solid commercial base and stellar reputation. The concern: Heavy competition from PE-backed consolidators driving up labor costs. You'll need to move fast on hiring.",
    listing_url: "https://example.com/listing-1",
    broker_name: "Sarah Johnson",
    broker_email: "sarah@texasbusinessbrokers.com",
    status: "active",
    featured_in_newsletter: false
  },
  {
    business_type: "Commercial Landscaping",
    city: "Phoenix",
    state: "AZ",
    revenue: 3100000,
    cash_flow: 720000,
    ebitda: 780000,
    asking_price: 2400000,
    down_payment: 480000,
    established_year: 2012,
    slug: "phoenix-commercial-landscaping",
    why_interesting: "• 65% recurring commercial contracts (HOAs, office parks)\n• Weather-resistant business model\n• 45 employees with solid management team\n• Fleet of 22 trucks included\n• Seller offering 40% financing at 6%",
    real_talk: "Solid fundamentals but watch the water restrictions coming in 2025. The equipment is well-maintained but you'll need CapEx for 3-4 trucks next year. Great starter business if you can handle the seasonality.",
    listing_url: "https://example.com/listing-2",
    broker_name: "Mike Rodriguez",
    broker_email: "mike@southwestbizbrokers.com",
    status: "active",
    featured_in_newsletter: true,
    newsletter_date: new Date().toISOString()
  },
  {
    business_type: "E-commerce Brand - Home Goods",
    city: "Remote",
    state: "US",
    revenue: 5600000,
    cash_flow: 1340000,
    ebitda: 1400000,
    asking_price: 4200000,
    established_year: 2018,
    slug: "ecommerce-home-goods-brand",
    why_interesting: "• 70% Amazon FBA, 30% Shopify DTC\n• 45% gross margins\n• 15 SKUs with 4 hero products\n• Owns all trademarks and has utility patents\n• YoY growth of 35% for past 3 years",
    real_talk: "Classic Amazon risk here - one hero SKU is 40% of revenue. But the patents are real and enforceable. Perfect add-on for someone with existing e-comm infrastructure. Solo buyers beware of the inventory requirements.",
    listing_url: "https://example.com/listing-3",
    broker_name: "Jennifer Chen",
    broker_email: "jennifer@digitalbusinessbrokers.com",
    status: "active",
    featured_in_newsletter: false
  },
  {
    business_type: "Metal Fabrication Shop",
    city: "Houston",
    state: "TX",
    revenue: 6800000,
    cash_flow: 1420000,
    ebitda: 1520000,
    asking_price: 5200000,
    down_payment: 1560000,
    established_year: 1998,
    slug: "houston-metal-fabrication",
    why_interesting: "• 25+ years serving oil & gas industry\n• $3M in equipment included\n• 32 skilled employees\n• ISO 9001 certified\n• Backlog of $2.1M in orders",
    real_talk: "Oil & gas concentration is both the opportunity and risk. When oil is above $70, this business prints money. Below that, buckle up. The equipment is top-notch but the workforce is aging - invest in apprenticeships ASAP.",
    listing_url: "https://example.com/listing-4",
    broker_name: "Robert Thompson",
    broker_email: "robert@gulfcoastbusinessadvisors.com",
    status: "active",
    featured_in_newsletter: true,
    newsletter_date: new Date().toISOString()
  },
  {
    business_type: "Pest Control Company",
    city: "Orlando",
    state: "FL",
    revenue: 2400000,
    cash_flow: 580000,
    ebitda: 620000,
    asking_price: 1950000,
    established_year: 2010,
    slug: "orlando-pest-control",
    why_interesting: "• 2,200 recurring residential customers\n• 85% customer retention rate\n• Average customer value $1,100/year\n• Seller financing 50% at 5.5%\n• Strong Google reviews (4.8 stars, 400+ reviews)",
    real_talk: "This is a lifestyle business done right. The recurring revenue is real but growth has plateaued. Perfect for someone who wants steady cash flow. Won't excite the Twitter bros but will pay for your kids' college.",
    listing_url: "https://example.com/listing-5",
    broker_name: "Maria Santos",
    broker_email: "maria@floridabusinessbrokers.net",
    status: "active",
    featured_in_newsletter: false
  },
  {
    business_type: "B2B Software - Field Service",
    city: "Denver",
    state: "CO",
    revenue: 3200000,
    cash_flow: 2100000,
    ebitda: 2200000,
    asking_price: 8400000,
    established_year: 2016,
    slug: "b2b-field-service-software",
    why_interesting: "• 100% recurring SaaS revenue\n• 320 customers, $830 average MRR\n• 95% gross margins\n• Net revenue retention 115%\n• Churn under 5% annually",
    real_talk: "The metrics are fantastic but it's built on old tech (PHP/MySQL). You'll need to invest in a rebuild within 18 months. Also, the founder IS the sales team. But if you can solve those two issues, this is a gem.",
    listing_url: "https://example.com/listing-6",
    broker_name: "David Park",
    broker_email: "david@techexits.com",
    status: "active",
    featured_in_newsletter: true,
    newsletter_date: new Date().toISOString()
  },
  {
    business_type: "Auto Repair Chain - 3 Locations",
    city: "Charlotte",
    state: "NC",
    revenue: 5400000,
    cash_flow: 890000,
    ebitda: 940000,
    asking_price: 3200000,
    down_payment: 960000,
    established_year: 2008,
    slug: "charlotte-auto-repair-chain",
    why_interesting: "• 3 profitable locations all within 15 miles\n• Established brand in market\n• 28 employees including 9 ASE certified techs\n• Average ticket $425\n• Fleet contracts with 3 companies",
    real_talk: "Margins are tight because they've been underpricing. Raise prices 10% and this is a different business. Location #3 needs work but the first two are gold. Seller is motivated due to health issues.",
    listing_url: "https://example.com/listing-7",
    broker_name: "James Wilson",
    broker_email: "james@carolinabusinessadvisors.com",
    status: "active",
    featured_in_newsletter: false
  },
  {
    business_type: "Plumbing Company",
    city: "Nashville",
    state: "TN",
    revenue: 3800000,
    cash_flow: 920000,
    ebitda: 980000,
    asking_price: 3100000,
    down_payment: 620000,
    established_year: 2003,
    slug: "nashville-plumbing-company",
    why_interesting: "• 20-year reputation in growing market\n• 18 licensed plumbers\n• 60% residential, 40% commercial\n• Average invoice $650\n• 24/7 emergency service premium pricing",
    real_talk: "Nashville's growth is your tailwind here. The team is solid but you'll be competing hard for talent. The after-hours service is 30% of profit - make sure you're ready for those 2am calls (or have someone who is).",
    listing_url: "https://example.com/listing-8",
    broker_name: "Patricia Davis",
    broker_email: "patricia@musiccitybusinessbrokers.com",
    status: "active",
    featured_in_newsletter: false
  },
  {
    business_type: "Commercial Cleaning Company",
    city: "Atlanta",
    state: "GA",
    revenue: 4100000,
    cash_flow: 680000,
    ebitda: 740000,
    asking_price: 2250000,
    established_year: 2011,
    slug: "atlanta-commercial-cleaning",
    why_interesting: "• 85 commercial contracts\n• 95% customer retention\n• All contracts are 12+ months\n• Strong systems and processes\n• Seller financing 45% at 6%",
    real_talk: "This is a grind business but the contracts are solid. Labor is your biggest challenge - the $15/hour days are over. Budget 20% wage increases. But if you can solve staffing, this cash flows like clockwork.",
    listing_url: "https://example.com/listing-9",
    broker_name: "Kevin Brown",
    broker_email: "kevin@atlantabizbrokers.com",
    status: "active",
    featured_in_newsletter: false
  },
  {
    business_type: "Roofing Contractor",
    city: "Dallas",
    state: "TX",
    revenue: 7200000,
    cash_flow: 1680000,
    ebitda: 1780000,
    asking_price: 5800000,
    down_payment: 1160000,
    established_year: 2006,
    slug: "dallas-roofing-contractor",
    why_interesting: "• Insurance restoration specialist\n• 40% commercial, 60% residential\n• In-house sales team of 8\n• GAF Master Elite Contractor\n• Average job size $15,000",
    real_talk: "Texas storms = Texas profits. But insurance companies are getting stingier. The commercial side is more stable. Sales team is excellent but expensive. This isn't passive - you need to work the insurance adjusters hard.",
    listing_url: "https://example.com/listing-10",
    broker_name: "Antonio Martinez",
    broker_email: "antonio@dallasmergers.com",
    status: "active",
    featured_in_newsletter: true,
    newsletter_date: new Date().toISOString()
  }
]

async function seedDeals() {
  console.log('Starting to seed deals...')
  
  for (const deal of sampleDeals) {
    const { data, error } = await supabase
      .from('deals')
      .insert([{
        ...deal,
        multiple: (deal.asking_price / deal.cash_flow).toFixed(2)
      }])
      .select()
    
    if (error) {
      console.error('Error inserting deal:', deal.business_type, error)
    } else {
      console.log('✓ Created deal:', deal.business_type)
    }
  }
  
  console.log('\nSeeding complete! 🎉')
}

seedDeals().catch(console.error)