import React from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function AlertPanel({ alerts, onUpdate }) {
  const handleResolve = async (id) => {
    try {
      await api.patch(`/alerts/${id}/resolve`)
      toast.success('Alert resolved')
      onUpdate?.()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resolve alert')
    }
  }

  return (
    <div className="card p-4">
      <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        Active Alerts ({alerts.length})
      </h2>

      {alerts.length === 0 ? (
        <p className="text-sm text-gray-500 py-6 text-center">No active alerts. Nice work!</p>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert._id} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`badge ${
                      alert.severity === 'critical' ? 'badge-red' : alert.severity === 'warning' ? 'badge-yellow' : 'badge-blue'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <p className="text-sm text-gray-700 mt-2">{alert.message}</p>
                </div>
                <button
                  onClick={() => handleResolve(alert._id)}
                  className="shrink-0 p-1.5 hover:bg-white rounded-lg text-emerald-600"
                  title="Mark resolved"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
