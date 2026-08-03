import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { CheckCircle, XCircle, Eye, MapPin, Clock, User } from 'lucide-react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import LoadingSpinner from '../common/LoadingSpinner'

const STATUS_BADGE = {
  pending: 'badge-yellow',
  approved: 'badge-green',
  rejected: 'badge-red',
  collected: 'badge-blue',
}

export default function ReportReview() {
  const [filter, setFilter] = useState('all')
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchReports = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/reports', { params: filter === 'all' ? {} : { status: filter } })
      setReports(data.reports)
    } catch {
      toast.error('Failed to load reports')
    } finally {
      setIsLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  const handleDecision = async (id, status) => {
    try {
      await api.patch(`/reports/${id}`, { status })
      toast.success(status === 'approved' ? 'Report approved' : 'Report rejected')
      fetchReports()
    } catch {
      toast.error('Failed to update report')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {['all', 'pending', 'approved', 'rejected', 'collected'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : reports.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-12">No reports in this category.</p>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report._id} className="card p-4">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm text-gray-900">{report.reporterName || 'Anonymous'}</h3>
                      <span className={`badge ${STATUS_BADGE[report.status] || 'badge-gray'}`}>{report.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{report.reporterPhone}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {report.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(report.createdAt).toLocaleString()}
                      </span>
                      {report.photo && (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Eye className="w-3 h-3" />
                          Photo attached
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {report.status === 'pending' && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDecision(report._id, 'approved')}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-emerald-600"
                      title="Approve"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDecision(report._id, 'rejected')}
                      className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600"
                      title="Reject"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
