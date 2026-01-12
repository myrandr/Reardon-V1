import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Log payload for debugging
    console.log('Testimonial API received:', payload);

    const response = await fetch('https://n8n.srv1013834.hstgr.cloud/webhook/testimonial-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('N8N webhook error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Webhook submission failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonial API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
