import asyncHandler from 'express-async-handler'
import Report from '../models/Report.js'
import Bin from '../models/Bin.js'

// POST /api/reports  (public — citizens, no auth required)
export const createReport = asyncHandler(async (req, res) => {
  const { reporterPhone, reporterName, address, lat, lng, description, photo, binId } = req.body

  if (!reporterPhone || !address) {
    res.status(400)
    throw new Error('Phone number and address are required')
  }

  const report = await Report.create({
    reporterPhone,
    reporterName,
    address,
    lat,
    lng,
    description,
    photo,
    bin: binId || null,
    priority: 'medium',
  })

  res.status(201).json({ report })
})

// GET /api/reports  (admin, collector)
export const getReports = asyncHandler(async (req, res) => {
  const { status } = req.query
  const filter = status ? { status } : {}
  const reports = await Report.find(filter).populate('bin').sort({ createdAt: -1 })
  res.json({ reports })
})

// PATCH /api/reports/:id  (admin — approve/reject, set priority)
export const updateReport = asyncHandler(async (req, res) => {
  const { status, priority } = req.body
  const report = await Report.findById(req.params.id)
  if (!report) {
    res.status(404)
    throw new Error('Report not found')
  }

  if (status) report.status = status
  if (priority) report.priority = priority
  report.reviewedBy = req.user._id
  await report.save()

  res.json({ report })
})

// PATCH /api/reports/:id/collect  (collector — mark as collected)
export const markCollected = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
  if (!report) {
    res.status(404)
    throw new Error('Report not found')
  }

  report.status = 'collected'
  report.collectedBy = req.user._id
  report.collectedAt = new Date()
  await report.save()

  if (report.bin) {
    await Bin.findByIdAndUpdate(report.bin, { fill_level: 0, lastCollected: new Date() })
  }

  res.json({ report })
})
