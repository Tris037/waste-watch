
import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ww_user')
    return stored ? JSON.parse(stored) : null
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('ww_token')
    if (!token) {
      setIsLoading(false)
      return
    }
    // Validate the stored token against the backend on first load
    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user)
        localStorage.setItem('ww_user', JSON.stringify(data.user))
      })
      .catch(() => {
        setUser(null)
        localStorage.removeItem('ww_token')
        localStorage.removeItem('ww_user')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('ww_token', data.token)
      localStorage.setItem('ww_user', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('ww_token')
    localStorage.removeItem('ww_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
