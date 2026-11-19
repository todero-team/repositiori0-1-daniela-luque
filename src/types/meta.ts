export interface MetricInsight {
  date_start: string;
  date_stop: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  reach?: string;
  ctr?: string;
  cpc?: string;
  cpm?: string;
  actions?: Array<{ action_type: string; value: string }>;
}

export interface Campaign {
  id: string;
  name: string;
  status: string;
  objective?: string;
  insights?: {
    data: Array<{
      spend?: string;
      impressions?: string;
      clicks?: string;
      reach?: string;
      actions?: Array<{ action_type: string; value: string }>;
    }>;
  };
}

export interface DashboardSummary {
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  roas: number;
}

export interface ChartDataPoint {
  date: string;
  spend: number;
  clicks: number;
  impressions: number;
}
