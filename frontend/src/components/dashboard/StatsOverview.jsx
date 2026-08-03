import React from 'react'
import { useEffect, useState } from 'react'
import { useBins } from '../../hooks/useBins'
import { useAlerts } from '../../hooks/useAlerts'
import api from '../../api/axios'
import { Trash2, AlertTriangle, ClipboardList, TrendingUp } from 'lucide-react'

export default function StatsOverview() {
  const { bins } = useBins()
  const { alerts } = useAlerts()
  const [reportCount, setReportCount] = useState(null)

  useEffect(() => {
    api
      .get('/reports', { params: { status: 'pending' } })
      .then(({ data }) => setReportCount(data.reports.length))
      .catch(() => setReportCount(null))
  }, [])

  const fullBins = bins.filter((b) => b.fill_level >= 80).length
  const avgFill = bins.length
    ? Math.round(bins.reduce((sum, b) => sum + b.fill_level, 0) / bins.length)
    : 0

  const stats = [
    { title: 'Total Bins', value: bins.length, icon: Trash2, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Avg Fill Level', value: `${avgFill}%`, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
    { title: 'Pending Reports', value: reportCount ?? '—', icon: ClipboardList, color: 'bg-amber-50 text-amber-600' },
    { title: 'Active Alerts', value: alerts.length, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
