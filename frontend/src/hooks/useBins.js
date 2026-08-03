import { useState, useEffect, useCallback } from 'react'
import api from '../api/axios'

export function useBins() {
  const [bins, setBins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBins = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/bins')
      setBins(data.bins)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bins')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBins()
  }, [fetchBins])

  return { bins, isLoading, error, fetchBins }
}
