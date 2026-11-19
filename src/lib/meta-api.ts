import { MetricInsight, Campaign, DashboardSummary, ChartDataPoint } from '@/types/meta';

const BASE_URL = 'https://graph.facebook.com/v20.0';
const accountId = process.env.META_AD_ACCOUNT_ID!;
const accessToken = process.env.META_ACCESS_TOKEN!;

function metaFetch(path: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('access_token', accessToken);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return fetch(url.toString()).then((r) => r.json());
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const fields = [
    'id', 'name', 'status', 'objective',
    'insights.date_preset(last_30d){spend,impressions,clicks,reach,actions}',
  ].join(',');

  const data = await metaFetch(`/${accountId}/campaigns`, { fields, limit: '50' });
  return data.data ?? [];
}

export async function fetchAccountInsights(datePreset: string): Promise<MetricInsight[]> {
  const fields = [
    'date_start', 'date_stop', 'spend', 'impressions', 'clicks',
    'reach', 'ctr', 'cpc', 'cpm', 'actions',
  ].join(',');

  const data = await metaFetch(`/${accountId}/insights`, {
    fields,
    date_preset: datePreset,
    time_increment: '1',
    limit: '90',
  });
  return data.data ?? [];
}

export function buildSummary(insights: MetricInsight[]): DashboardSummary {
  let spend = 0, impressions = 0, clicks = 0, reach = 0, conversions = 0, revenue = 0;

  for (const row of insights) {
    spend += parseFloat(row.spend || '0');
    impressions += parseInt(row.impressions || '0', 10);
    clicks += parseInt(row.clicks || '0', 10);
    reach += parseInt(row.reach || '0', 10);

    for (const action of row.actions ?? []) {
      if (action.action_type === 'purchase') {
        conversions += parseInt(action.value, 10);
      }
      if (action.action_type === 'offsite_conversion.fb_pixel_purchase') {
        revenue += parseFloat(action.value);
      }
    }
  }

  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const cpc = clicks > 0 ? spend / clicks : 0;
  const cpm = impressions > 0 ? (spend / impressions) * 1000 : 0;
  const roas = spend > 0 ? revenue / spend : 0;

  return { spend, impressions, clicks, reach, ctr, cpc, cpm, conversions, roas };
}

export function buildChartData(insights: MetricInsight[]): ChartDataPoint[] {
  return insights
    .map((row) => ({
      date: row.date_start,
      spend: parseFloat(row.spend || '0'),
      clicks: parseInt(row.clicks || '0', 10),
      impressions: parseInt(row.impressions || '0', 10),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
