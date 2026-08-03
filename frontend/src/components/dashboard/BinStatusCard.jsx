import React from 'react'
export default function BinStatusCard({ bin, onClick, isSelected }) {
  const fillColor =
    bin.fill_level >= 80 ? 'text-red-600 bg-red-50' : bin.fill_level >= 50 ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'

  return (
    <button
      onClick={() => onClick(bin)}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isSelected ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{bin.address}</p>
          <p className="text-sm text-gray-500">{bin.zone} · {bin.bin_id}</p>
        </div>
        <span className={`shrink-0 px-2.5 py-1 rounded-full text-sm font-bold ${fillColor}`}>
          {bin.fill_level}%
        </span>
      </div>
      <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            bin.fill_level >= 80 ? 'bg-red-500' : bin.fill_level >= 50 ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${bin.fill_level}%` }}
        />
      </div>
    </button>
  )
}
