'use client';

const PRESETS = [
  { label: 'Hoy', value: 'today' },
  { label: 'Ayer', value: 'yesterday' },
  { label: '7 días', value: 'last_7d' },
  { label: '30 días', value: 'last_30d' },
  { label: 'Este mes', value: 'this_month' },
  { label: 'Mes anterior', value: 'last_month' },
];

export default function DateFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            value === p.value
              ? 'bg-[#1877F2] text-white'
              : 'bg-[#1a1d2e] border border-[#2a2d3e] text-gray-400 hover:text-white hover:border-[#1877F2]'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
