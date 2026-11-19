'use client';

import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import SpendChart from './SpendChart';
import ClicksChart from './ClicksChart';
import CampaignTable from './CampaignTable';
import DateFilter from './DateFilter';
import { DashboardSummary, ChartDataPoint, Campaign } from '@/types/meta';

function fmt(n: number, style: 'currency' | 'decimal' | 'percent' = 'decimal', digits = 2) {
  if (style === 'currency') return `$${n.toFixed(digits)}`;
  if (style === 'percent') return `${n.toFixed(2)}%`;
  return n.toLocaleString();
}

export default function Dashboard() {
  const [datePreset, setDatePreset] = useState('last_30d');
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`/api/meta/insights?date_preset=${datePreset}`).then((r) => r.json()),
      fetch('/api/meta/campaigns').then((r) => r.json()),
    ])
      .then(([insights, camps]) => {
        if (insights.error) throw new Error(insights.error);
        setSummary(insights.summary);
        setChartData(insights.chartData);
        setCampaigns(camps.campaigns ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [datePreset]);

  return (
    <main className="min-h-screen bg-[#0f1117] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Meta Ads Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Métricas de rendimiento de campañas</p>
          </div>
          <DateFilter value={datePreset} onChange={setDatePreset} />
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 mb-6 text-red-300 text-sm">
            Error al cargar datos: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500">Cargando métricas…</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <MetricCard title="Gasto total" value={fmt(summary?.spend ?? 0, 'currency')} icon="💰" />
              <MetricCard title="Impresiones" value={fmt(summary?.impressions ?? 0)} icon="👁" />
              <MetricCard title="Clics" value={fmt(summary?.clicks ?? 0)} icon="🖱" />
              <MetricCard title="CTR" value={fmt(summary?.ctr ?? 0, 'percent')} icon="📊" />
              <MetricCard title="CPC" value={fmt(summary?.cpc ?? 0, 'currency')} icon="🎯" />
              <MetricCard title="CPM" value={fmt(summary?.cpm ?? 0, 'currency')} icon="📈" />
              <MetricCard title="Conversiones" value={fmt(summary?.conversions ?? 0)} icon="✅" />
              <MetricCard title="ROAS" value={`${(summary?.roas ?? 0).toFixed(2)}x`} icon="🚀" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <SpendChart data={chartData} />
              <ClicksChart data={chartData} />
            </div>

            <CampaignTable campaigns={campaigns} />
          </>
        )}
      </div>
    </main>
  );
}
