import React from 'react'
export default function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div
      className={`${sizes[size] || sizes.md} rounded-full border-emerald-200 border-t-emerald-600 animate-spin`}
      role="status"
      aria-label="Loading"
    />
  )
}
