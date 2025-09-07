import { NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/beehive'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    await subscribeToNewsletter(email)

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    )
  }
}