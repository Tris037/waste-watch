import asyncHandler from 'express-async-handler'
import Alert from '../models/Alert.js'

// GET /api/alerts  (admin, collector)
export const getAlerts = asyncHandler(async (req, res) => {
  const { status = 'active' } = req.query
  const alerts = await Alert.find(status === 'all' ? {} : { status }).populate('bin').sort({ createdAt: -1 })
  res.json({ alerts })
})

// POST /api/alerts  (admin, or system-generated)
export const createAlert = asyncHandler(async (req, res) => {
  const { bin, message, severity } = req.body
  const alert = await Alert.create({ bin, message, severity })
  res.status(201).json({ alert })
})

// PATCH /api/alerts/:id/resolve
export const resolveAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.findById(req.params.id)
  if (!alert) {
    res.status(404)
    throw new Error('Alert not found')
  }
  alert.status = 'resolved'
  alert.resolvedBy = req.user._id
  alert.resolvedAt = new Date()
  await alert.save()
  res.json({ alert })
})
