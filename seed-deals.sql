-- Copy and paste this SQL into Supabase SQL editor:

-- First, temporarily disable RLS
ALTER TABLE deals DISABLE ROW LEVEL SECURITY;

-- Deal 1: HVAC Service Company
INSERT INTO deals (
  business_type, city, state, revenue, cash_flow, ebitda, asking_price,
  down_payment, established_year, slug, why_interesting, real_talk,
  listing_url, broker_name, broker_email, status, featured_in_newsletter,
  multiple, newsletter_date
) VALUES (
  'HVAC Service Company',
  'Austin',
  'TX',
  4200000,
  980000,
  1050000,
  3500000,
  700000,
  2005,
  'austin-hvac-service-company',
  '• 18-year track record with 40% commercial contracts
• Strong margins at 25% EBITDA
• Owner retiring but willing to stay for 18-month transition
• Equipment recently upgraded (2022)
• Recurring maintenance contracts worth $1.2M annually',
  'The good: Rock-solid commercial base and stellar reputation. The concern: Heavy competition from PE-backed consolidators driving up labor costs. You''ll need to move fast on hiring.',
  'https://example.com/listing-1',
  'Sarah Johnson',
  'sarah@texasbusinessbrokers.com',
  'active',
  false,
  3.57,
  NULL
);

-- Deal 2: Commercial Landscaping
INSERT INTO deals (
  business_type, city, state, revenue, cash_flow, ebitda, asking_price,
  down_payment, established_year, slug, why_interesting, real_talk,
  listing_url, broker_name, broker_email, status, featured_in_newsletter,
  multiple, newsletter_date
) VALUES (
  'Commercial Landscaping',
  'Phoenix',
  'AZ',
  3100000,
  720000,
  780000,
  2400000,
  480000,
  2012,
  'phoenix-commercial-landscaping',
  '• 65% recurring commercial contracts (HOAs, office parks)
• Weather-resistant business model
• 45 employees with solid management team
• Fleet of 22 trucks included
• Seller offering 40% financing at 6%',
  'Solid fundamentals but watch the water restrictions coming in 2025. The equipment is well-maintained but you''ll need CapEx for 3-4 trucks next year. Great starter business if you can handle the seasonality.',
  'https://example.com/listing-2',
  'Mike Rodriguez',
  'mike@southwestbizbrokers.com',
  'active',
  true,
  3.33,
  CURRENT_TIMESTAMP
);

-- Deal 3: E-commerce Brand - Home Goods
INSERT INTO deals (
  business_type, city, state, revenue, cash_flow, ebitda, asking_price,
  down_payment, established_year, slug, why_interesting, real_talk,
  listing_url, broker_name, broker_email, status, featured_in_newsletter,
  multiple, newsletter_date
) VALUES (
  'E-commerce Brand - Home Goods',
  'Remote',
  'US',
  5600000,
  1340000,
  1400000,
  4200000,
  NULL,
  2018,
  'ecommerce-home-goods-brand',
  '• 70% Amazon FBA, 30% Shopify DTC
• 45% gross margins
• 15 SKUs with 4 hero products
• Owns all trademarks and has utility patents
• YoY growth of 35% for past 3 years',
  'Classic Amazon risk here - one hero SKU is 40% of revenue. But the patents are real and enforceable. Perfect add-on for someone with existing e-comm infrastructure. Solo buyers beware of the inventory requirements.',
  'https://example.com/listing-3',
  'Jennifer Chen',
  'jennifer@digitalbusinessbrokers.com',
  'active',
  false,
  3.13,
  NULL
);

-- Deal 4: Metal Fabrication Shop
INSERT INTO deals (
  business_type, city, state, revenue, cash_flow, ebitda, asking_price,
  down_payment, established_year, slug, why_interesting, real_talk,
  listing_url, broker_name, broker_email, status, featured_in_newsletter,
  multiple, newsletter_date
) VALUES (
  'Metal Fabrication Shop',
  'Houston',
  'TX',
  6800000,
  1420000,
  1520000,
  5200000,
  1560000,
  1998,
  'houston-metal-fabrication',
  '• 25+ years serving oil & gas industry
• $3M in equipment included
• 32 skilled employees
• ISO 9001 certified
• Backlog of $2.1M in orders',
  'Oil & gas concentration is both the opportunity and risk. When oil is above $70, this business prints money. Below that, buckle up. The equipment is top-notch but the workforce is aging - invest in apprenticeships ASAP.',
  'https://example.com/listing-4',
  'Robert Thompson',
  'robert@gulfcoastbusinessadvisors.com',
  'active',
  true,
  3.66,
  CURRENT_TIMESTAMP
);

-- Deal 5: Pest Control Company
INSERT INTO deals (
  business_type, city, state, revenue, cash_flow, ebitda, asking_price,
  down_payment, established_year, slug, why_interesting, real_talk,
  listing_url, broker_name, broker_email, status, featured_in_newsletter,
  multiple, newsletter_date
) VALUES (
  'Pest Control Company',
  'Orlando',
  'FL',
  2400000,
  580000,
  620000,
  1950000,
  NULL,
  2010,
  'orlando-pest-control',
  '• 2,200 recurring residential customers
• 85% customer retention rate
• Average customer value $1,100/year
• Seller financing 50% at 5.5%
• Strong Google reviews (4.8 stars, 400+ reviews)',
  'This is a lifestyle business done right. The recurring revenue is real but growth has plateaued. Perfect for someone who wants steady cash flow. Won''t excite the Twitter bros but will pay for your kids'' college.',
  'https://example.com/listing-5',
  'Maria Santos',
  'maria@floridabusinessbrokers.net',
  'active',
  false,
  3.36,
  NULL
);

-- Re-enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
