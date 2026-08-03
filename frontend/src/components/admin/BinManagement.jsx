import React from 'react'
import { useState } from 'react'
import { Plus, Search, MapPin, Trash2, X } from 'lucide-react'
import { useBins } from '../../hooks/useBins'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import LoadingSpinner from '../common/LoadingSpinner'

const emptyForm = { bin_id: '', address: '', zone: '', lat: '', lng: '' }

export default function BinManagement() {
  const { bins, isLoading, fetchBins } = useBins()
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const filteredBins = bins.filter(
    (b) => b.address.toLowerCase().includes(searchQuery.toLowerCase()) || b.zone.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/bins', { ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng) })
      toast.success('Bin added')
      setForm(emptyForm)
      setShowForm(false)
      fetchBins()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add bin')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bins/${id}`)
      toast.success('Bin removed')
      fetchBins()
    } catch {
      toast.error('Failed to remove bin')
    }
  }

  const statusLabel = (level) => (level >= 80 ? 'overflowing' : level >= 50 ? 'full' : 'ok')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button className="btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Bin'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="input-field" placeholder="Bin ID (e.g. BIN-005)" required value={form.bin_id} onChange={(e) => setForm({ ...form, bin_id: e.target.value })} />
          <input className="input-field" placeholder="Zone (e.g. CBD)" required value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} />
          <input className="input-field md:col-span-2" placeholder="Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <input className="input-field" placeholder="Latitude" required type="number" step="any" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} />
          <input className="input-field" placeholder="Longitude" required type="number" step="any" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} />
          <button type="submit" disabled={saving} className="btn-primary md:col-span-2 justify-center">
            {saving ? 'Saving...' : 'Save Bin'}
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBins.map((bin) => (
            <div key={bin._id} className="card p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{bin.bin_id}</p>
                    <p className="text-xs text-gray-500">{bin.zone}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(bin._id)} className="p-1.5 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">{bin.address}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Fill Level</span>
                    <span className="text-xs font-medium text-gray-700">{bin.fill_level}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${bin.fill_level >= 80 ? 'bg-red-500' : bin.fill_level >= 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                      style={{ width: `${bin.fill_level}%` }}
                    />
                  </div>
                </div>
                <span className={`badge ${bin.fill_level >= 80 ? 'badge-red' : bin.fill_level >= 50 ? 'badge-yellow' : 'badge-blue'}`}>
                  {statusLabel(bin.fill_level)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
