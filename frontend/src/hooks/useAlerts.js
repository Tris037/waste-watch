import { useState, useEffect, useCallback } from 'react'
import api from '../api/axios'

export function useAlerts() {
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAlerts = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/alerts', { params: { status: 'active' } })
      setAlerts(data.alerts)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load alerts')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts])

  return { alerts, isLoading, error, fetchAlerts }
}
