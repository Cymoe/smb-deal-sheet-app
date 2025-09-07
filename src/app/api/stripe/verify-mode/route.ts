import { NextResponse } from 'next/server'

export async function GET() {
  const secretKey = process.env.STRIPE_SECRET_KEY || ''
  const isTestMode = secretKey.startsWith('sk_test_')
  
  return NextResponse.json({
    mode: isTestMode ? 'TEST' : 'LIVE',
    keyPrefix: secretKey.substring(0, 7) + '...',
    monthlyPriceId: process.env.STRIPE_PRICE_ID_MONTHLY,
    annualPriceId: process.env.STRIPE_PRICE_ID_ANNUAL,
  })
}