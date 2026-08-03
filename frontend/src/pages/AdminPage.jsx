import React from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import AdminPanel from '../components/admin/AdminPanel'
import { Shield } from 'lucide-react'

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage users, bins, and citizen reports</p>
        </div>
        <AdminPanel />
      </div>
    </DashboardLayout>
  )
}
