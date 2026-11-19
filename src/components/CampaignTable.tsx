'use client';

import { Campaign } from '@/types/meta';

const statusColor: Record<string, string> = {
  ACTIVE: 'bg-green-900 text-green-300',
  PAUSED: 'bg-yellow-900 text-yellow-300',
  ARCHIVED: 'bg-gray-800 text-gray-400',
};

export default function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="bg-[#1a1d2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
      <div className="p-5 border-b border-[#2a2d3e]">
        <h3 className="text-sm text-gray-400">Campañas</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2d3e]">
              {['Nombre', 'Estado', 'Gasto', 'Impresiones', 'Clics'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs text-gray-400 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => {
              const ins = c.insights?.data?.[0];
              return (
                <tr key={c.id} className="border-b border-[#2a2d3e] hover:bg-[#1f2335]">
                  <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[c.status] ?? 'bg-gray-800 text-gray-400'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">${parseFloat(ins?.spend ?? '0').toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-300">{parseInt(ins?.impressions ?? '0', 10).toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-300">{parseInt(ins?.clicks ?? '0', 10).toLocaleString()}</td>
                </tr>
              );
            })}
            {campaigns.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Sin campañas</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
