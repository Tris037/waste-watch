import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { useBins } from '../../hooks/useBins'
import 'leaflet/dist/leaflet.css'

const NAIROBI_CENTER = [-1.2833, 36.8167]

function fillColor(level) {
  if (level >= 80) return '#dc2626' // red
  if (level >= 50) return '#d97706' // amber
  return '#059669' // emerald
}

export default function BinMap({ height = '400px', selectedBin, onBinSelect }) {
  const { bins } = useBins()

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden">
      <MapContainer center={NAIROBI_CENTER} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bins.map((bin) => (
          <CircleMarker
            key={bin.bin_id}
            center={[bin.lat, bin.lng]}
            radius={selectedBin?.bin_id === bin.bin_id ? 12 : 9}
            pathOptions={{ color: fillColor(bin.fill_level), fillColor: fillColor(bin.fill_level), fillOpacity: 0.7 }}
            eventHandlers={{ click: () => onBinSelect?.(bin) }}
          >
            <Popup>
              <p className="font-medium">{bin.address}</p>
              <p className="text-sm">{bin.zone} · {bin.fill_level}% full</p>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
