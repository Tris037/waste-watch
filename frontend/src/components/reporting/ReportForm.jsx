import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Camera, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../api/axios'

const schema = z.object({
  reporterName: z.string().optional(),
  reporterPhone: z.string().min(9, 'Enter a valid phone number'),
  address: z.string().min(3, 'Describe the bin location'),
  description: z.string().optional(),
})

export default function ReportForm({ onSuccess }) {
  const [coords, setCoords] = useState(null)
  const [locating, setLocating] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Location is not supported on this device')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        toast.success('Location captured')
        setLocating(false)
      },
      () => {
        toast.error('Could not get your location')
        setLocating(false)
      }
    )
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  const onSubmit = async (formData) => {
    setSubmitting(true)
    try {
      await api.post('/reports', {
        ...formData,
        lat: coords?.lat,
        lng: coords?.lng,
        photo,
      })
      toast.success('Report submitted — thank you!')
      onSuccess?.()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit report')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="label">Your Name (Optional)</label>
        <input className="input-field" placeholder="Jane Wanjiru" {...register('reporterName')} />
      </div>

      <div>
        <label className="label">Phone Number</label>
        <input className="input-field" placeholder="07XX XXX XXX" {...register('reporterPhone')} />
        {errors.reporterPhone && <p className="text-sm text-red-600 mt-1">{errors.reporterPhone.message}</p>}
      </div>

      <div>
        <label className="label">Bin Location / Address</label>
        <input className="input-field" placeholder="e.g. City Market, Main Entrance" {...register('address')} />
        {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
        <button
          type="button"
          onClick={handleUseLocation}
          disabled={locating}
          className="btn-secondary text-sm mt-2"
        >
          {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
          {coords ? 'Location captured ✓' : 'Use my current location'}
        </button>
      </div>

      <div>
        <label className="label">Description (Optional)</label>
        <textarea className="input-field resize-none" rows={3} placeholder="Any extra details..." {...register('description')} />
      </div>

      <div>
        <label className="label">Photo (Optional)</label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-emerald-300 transition-colors">
          {photo ? (
            <img src={photo} alt="Bin" className="w-full h-40 object-cover rounded-lg" />
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-2 py-2">
              <Camera className="w-6 h-6 text-gray-300" />
              <span className="text-sm text-gray-500">Tap to add a photo</span>
              <input type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} className="hidden" />
            </label>
          )}
        </div>
      </div>

      <button type="submit" disabled={submitting} className="w-full btn-primary py-3">
        {submitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  )
}
