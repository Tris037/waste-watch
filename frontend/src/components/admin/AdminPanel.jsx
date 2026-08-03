import React from 'react'
import { useState } from 'react'
import UserManagement from './UserManagement'
import BinManagement from './BinManagement'
import ReportReview from './ReportReview'
import { Users, Trash2, ClipboardList, BarChart3 } from 'lucide-react'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users')

  const tabs = [
    { id: 'users', label: 'Users', icon: Users, component: UserManagement },
    { id: 'bins', label: 'Bins', icon: Trash2, component: BinManagement },
    { id: 'reports', label: 'Reports', icon: ClipboardList, component: ReportReview },
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-100 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
      {ActiveComponent && <ActiveComponent />}
    </div>
  )
}