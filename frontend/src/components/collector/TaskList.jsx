import React from 'react'
import { useEffect, useState } from 'react'
import { MapPin, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react'
import api from '../../api/axios'
import LoadingSpinner from '../common/LoadingSpinner'

export default function TaskList({ onSelectTask }) {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get('/reports', { params: { status: 'approved' } })
      .then(({ data }) => setReports(data.reports))
      .finally(() => setIsLoading(false))
  }, [])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'high':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (reports.length === 0) {
    return <p className="text-sm text-gray-500 text-center py-12">No approved tasks assigned right now.</p>
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <button
          key={report._id}
          onClick={() =>
            onSelectTask({
              id: report._id,
              address: report.address,
              zone: report.bin?.zone || 'Unassigned zone',
              priority: report.priority,
              fillLevel: report.bin?.fill_level ?? '—',
            })
          }
          className="w-full card p-4 text-left hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  report.priority === 'critical' ? 'bg-red-100' : 'bg-amber-100'
                }`}
              >
                <MapPin className={`w-5 h-5 ${report.priority === 'critical' ? 'text-red-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-gray-900">{report.address}</h3>
                  {report.priority === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{report.bin?.zone || 'Unassigned zone'}</p>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(report.priority)}`}>
                  {report.priority}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </button>
      ))}
    </div>
  )
}
