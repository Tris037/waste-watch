import React from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import CollectorView from '../components/collector/CollectorView'
import { Truck } from 'lucide-react'

export default function CollectorPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-600" />
            My Collection Tasks
          </h1>
          <p className="text-sm text-gray-500 mt-1">View and manage your assigned collection routes</p>
        </div>
        <CollectorView />
      </div>
    </DashboardLayout>
  )
}
