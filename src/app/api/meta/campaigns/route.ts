import { NextResponse } from 'next/server';
import { fetchCampaigns } from '@/lib/meta-api';

export async function GET() {
  try {
    const campaigns = await fetchCampaigns();
    return NextResponse.json({ campaigns });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
