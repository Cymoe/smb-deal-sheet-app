import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const deal = searchParams.get('deal')
  const origin = searchParams.get('origin') || request.nextUrl.origin
  
  // Redirect to the correct origin with the deal
  const redirectUrl = deal ? `${origin}/deals/${deal}` : `${origin}/deals`
  
  return NextResponse.redirect(redirectUrl)
}