import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      dealId,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
      budgetRange,
      timeline,
      experienceLevel
    } = body
    
    // Validate required fields
    if (!dealId || !buyerName || !buyerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Insert buyer interest
    const { data, error } = await supabase
      .from('buyer_interests')
      .insert({
        deal_id: dealId,
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        buyer_phone: buyerPhone,
        message,
        budget_range: budgetRange,
        timeline,
        experience_level: experienceLevel
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error saving buyer interest:', error)
      return NextResponse.json(
        { error: 'Failed to save your interest' },
        { status: 500 }
      )
    }
    
    // TODO: Send email notification to Myles
    // This could be done with a webhook or email service
    
    return NextResponse.json({
      success: true,
      message: 'Your interest has been recorded. We\'ll be in touch soon!',
      data
    })
  } catch (error) {
    console.error('Buyer interest error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}