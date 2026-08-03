import React from 'react'
import { useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import StatsOverview from '../components/dashboard/StatsOverview'
import BinMap from '../components/dashboard/BinMap'
import BinStatusCard from '../components/dashboard/BinStatusCard'
import AlertPanel from '../components/dashboard/AlertPanel'
import { useBins } from '../hooks/useBins'
import { useAlerts } from '../hooks/useAlerts'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { MapPin, List, AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  const { bins, isLoading: binsLoading } = useBins()
  const { alerts, isLoading: alertsLoading, fetchAlerts } = useAlerts()
  const [selectedBin, setSelectedBin] = useState(null)
  const [viewMode, setViewMode] = useState('map') // 'map' or 'list'

  const fullBins = bins.filter(b => b.fill_level >= 80)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage waste collection operations</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              <MapPin className="w-4 h-4" />
              Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              <List className="w-4 h-4" />
              List
            </button>
          </div>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {viewMode === 'map' ? (
              <div className="card p-4">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Bin Locations
                </h2>
                <BinMap 
                  height="500px" 
                  selectedBin={selectedBin}
                  onBinSelect={setSelectedBin}
                />
              </div>
            ) : (
              <div className="card p-4">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <List className="w-5 h-5 text-emerald-600" />
                  Bin Status List
                </h2>
                {binsLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {bins.map(bin => (
                      <BinStatusCard 
                        key={bin.bin_id} 
                        bin={bin} 
                        onClick={setSelectedBin}
                        isSelected={selectedBin?.bin_id === bin.bin_id}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {fullBins.length > 0 && (
              <div className="card p-4 mt-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Bins Needing Attention ({fullBins.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fullBins.map(bin => (
                    <BinStatusCard 
                      key={bin.bin_id} 
                      bin={bin} 
                      onClick={setSelectedBin}
                      isSelected={selectedBin?.bin_id === bin.bin_id}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <AlertPanel alerts={alerts} onUpdate={fetchAlerts} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}