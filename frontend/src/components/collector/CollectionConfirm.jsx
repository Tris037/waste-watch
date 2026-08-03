import React from 'react'
import { useState } from 'react'
import { CheckCircle, X, Camera, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../api/axios'

export default function CollectionConfirm({ task, onComplete, onCancel }) {
  const [photo, setPhoto] = useState(null)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      await api.patch(`/reports/${task.id}/collect`, { notes })
      toast.success('Collection completed! Great job.')
      onComplete()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm collection')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-gray-900">Confirm Collection</h3>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{task.address}</h4>
            <p className="text-sm text-gray-500">{task.zone}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge badge-red">{task.priority}</span>
              {task.fillLevel !== '—' && <span className="text-sm font-bold text-gray-700">{task.fillLevel}% full</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="label">Collection Photo</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-300 transition-colors">
            {photo ? (
              <div className="relative">
                <img src={photo} alt="Collection" className="w-full h-48 object-cover rounded-lg" />
                <button onClick={() => setPhoto(null)} className="absolute top-2 right-2 p-1 bg-white rounded-lg shadow-sm">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="space-y-2 cursor-pointer flex flex-col items-center">
                <Camera className="w-8 h-8 text-gray-300 mx-auto" />
                <span className="text-sm text-gray-500">Take a photo of the emptied bin</span>
                <span className="btn-secondary text-sm">
                  <Camera className="w-4 h-4" />
                  Take Photo
                </span>
                <input type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="label">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any issues or observations..."
            rows={3}
            className="input-field resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 btn-secondary">
          Cancel
        </button>
        <button onClick={handleComplete} disabled={isSubmitting} className="flex-1 btn-primary">
          <CheckCircle className="w-5 h-5" />
          {isSubmitting ? 'Processing...' : 'Confirm Collection'}
        </button>
      </div>
    </div>
  )
}
