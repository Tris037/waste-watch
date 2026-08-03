import React from 'react'
import ReportForm from '../components/reporting/ReportForm'
import { MapPin, Info, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for helping keep our city clean. Collection teams have been notified if the bin is full.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Report a Full Bin</h1>
          <p className="text-gray-500 mt-1">Help us keep the city clean by reporting overflowing waste bins</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-amber-800 font-medium">No account needed!</p>
            <p className="text-sm text-amber-700 mt-1">
              Anyone can report a bin. Just provide your phone number so we can follow up if needed.
            </p>
          </div>
        </div>

        <div className="card p-6">
          <ReportForm onSuccess={() => setSubmitted(true)} />
        </div>
      </div>
    </div>
  )
}