-- Create buyer interests table to track who's interested in which deals
CREATE TABLE IF NOT EXISTS buyer_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT,
  message TEXT,
  budget_range TEXT,
  timeline TEXT,
  experience_level TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'not_qualified')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_buyer_interests_deal_id ON buyer_interests(deal_id);
CREATE INDEX IF NOT EXISTS idx_buyer_interests_email ON buyer_interests(buyer_email);
CREATE INDEX IF NOT EXISTS idx_buyer_interests_created_at ON buyer_interests(created_at);

-- Add RLS policies
ALTER TABLE buyer_interests ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read buyer interests (admin functionality)
CREATE POLICY "Authenticated users can read buyer interests" ON buyer_interests
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Anyone can create a buyer interest (for lead capture)
CREATE POLICY "Anyone can create buyer interests" ON buyer_interests
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can update buyer interests
CREATE POLICY "Authenticated users can update buyer interests" ON buyer_interests
  FOR UPDATE
  USING (auth.role() = 'authenticated');