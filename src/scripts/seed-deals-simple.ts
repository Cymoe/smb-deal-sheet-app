// Simple script to generate SQL for inserting deals
// Copy and paste the output into Supabase SQL editor

const deals = [
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
    why_interesting: `• 18-year track record with 40% commercial contracts
• Strong margins at 25% EBITDA
• Owner retiring but willing to stay for 18-month transition
• Equipment recently upgraded (2022)
• Recurring maintenance contracts worth $1.2M annually`,
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
    why_interesting: `• 65% recurring commercial contracts (HOAs, office parks)
• Weather-resistant business model
• 45 employees with solid management team
• Fleet of 22 trucks included
• Seller offering 40% financing at 6%`,
    real_talk: "Solid fundamentals but watch the water restrictions coming in 2025. The equipment is well-maintained but you'll need CapEx for 3-4 trucks next year. Great starter business if you can handle the seasonality.",
    listing_url: "https://example.com/listing-2",
    broker_name: "Mike Rodriguez",
    broker_email: "mike@southwestbizbrokers.com",
    status: "active",
    featured_in_newsletter: true
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
    why_interesting: `• 70% Amazon FBA, 30% Shopify DTC
• 45% gross margins
• 15 SKUs with 4 hero products
• Owns all trademarks and has utility patents
• YoY growth of 35% for past 3 years`,
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
    why_interesting: `• 25+ years serving oil & gas industry
• $3M in equipment included
• 32 skilled employees
• ISO 9001 certified
• Backlog of $2.1M in orders`,
    real_talk: "Oil & gas concentration is both the opportunity and risk. When oil is above $70, this business prints money. Below that, buckle up. The equipment is top-notch but the workforce is aging - invest in apprenticeships ASAP.",
    listing_url: "https://example.com/listing-4",
    broker_name: "Robert Thompson",
    broker_email: "robert@gulfcoastbusinessadvisors.com",
    status: "active",
    featured_in_newsletter: true
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
    why_interesting: `• 2,200 recurring residential customers
• 85% customer retention rate
• Average customer value $1,100/year
• Seller financing 50% at 5.5%
• Strong Google reviews (4.8 stars, 400+ reviews)`,
    real_talk: "This is a lifestyle business done right. The recurring revenue is real but growth has plateaued. Perfect for someone who wants steady cash flow. Won't excite the Twitter bros but will pay for your kids' college.",
    listing_url: "https://example.com/listing-5",
    broker_name: "Maria Santos",
    broker_email: "maria@floridabusinessbrokers.net",
    status: "active",
    featured_in_newsletter: false
  }
];

// Generate SQL
console.log("-- Copy and paste this SQL into Supabase SQL editor:\n");
console.log("-- First, temporarily disable RLS");
console.log("ALTER TABLE deals DISABLE ROW LEVEL SECURITY;\n");

deals.forEach((deal, index) => {
  const multiple = (deal.asking_price / deal.cash_flow).toFixed(2);
  
  console.log(`-- Deal ${index + 1}: ${deal.business_type}`);
  console.log(`INSERT INTO deals (
  business_type, city, state, revenue, cash_flow, ebitda, asking_price,
  down_payment, established_year, slug, why_interesting, real_talk,
  listing_url, broker_name, broker_email, status, featured_in_newsletter,
  multiple, newsletter_date
) VALUES (
  '${deal.business_type}',
  '${deal.city}',
  '${deal.state}',
  ${deal.revenue},
  ${deal.cash_flow},
  ${deal.ebitda || 'NULL'},
  ${deal.asking_price},
  ${deal.down_payment || 'NULL'},
  ${deal.established_year},
  '${deal.slug}',
  '${deal.why_interesting.replace(/'/g, "''")}',
  '${deal.real_talk.replace(/'/g, "''")}',
  '${deal.listing_url}',
  '${deal.broker_name}',
  '${deal.broker_email}',
  '${deal.status}',
  ${deal.featured_in_newsletter},
  ${multiple},
  ${deal.featured_in_newsletter ? 'CURRENT_TIMESTAMP' : 'NULL'}
);\n`);
});

console.log("-- Re-enable RLS");
console.log("ALTER TABLE deals ENABLE ROW LEVEL SECURITY;");