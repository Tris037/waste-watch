import React from 'react'
import { useState } from 'react'
import TaskList from './TaskList'
import CollectionConfirm from './CollectionConfirm'
import { Truck, MapPin, List } from 'lucide-react'

export default function CollectorView() {
  const [view, setView] = useState('list') // 'list' or 'map'
  const [selectedTask, setSelectedTask] = useState(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">My Collection Tasks</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg ${view === 'list' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('map')}
            className={`p-2 rounded-lg ${view === 'map' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {selectedTask ? (
        <CollectionConfirm 
          task={selectedTask} 
          onComplete={() => setSelectedTask(null)}
          onCancel={() => setSelectedTask(null)}
        />
      ) : (
        <TaskList onSelectTask={setSelectedTask} />
      )}
    </div>
  )
}