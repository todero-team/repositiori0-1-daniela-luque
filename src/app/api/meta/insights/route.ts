import { NextRequest, NextResponse } from 'next/server';
import { fetchAccountInsights, buildSummary, buildChartData } from '@/lib/meta-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const datePreset = searchParams.get('date_preset') || 'last_30d';

  try {
    const insights = await fetchAccountInsights(datePreset);
    return NextResponse.json({
      summary: buildSummary(insights),
      chartData: buildChartData(insights),
      raw: insights,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
