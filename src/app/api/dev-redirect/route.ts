import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  
  if (code && process.env.NODE_ENV === 'development') {
    // Redirect to localhost with the auth code
    return NextResponse.redirect(`http://localhost:3000/auth/callback?code=${code}`)
  }
  
  return NextResponse.json({ error: 'No code provided' }, { status: 400 })
}