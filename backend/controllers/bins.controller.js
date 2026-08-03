import asyncHandler from 'express-async-handler'
import Bin from '../models/Bin.js'
import Alert from '../models/Alert.js'

// GET /api/bins
export const getBins = asyncHandler(async (req, res) => {
  const bins = await Bin.find().sort({ fill_level: -1 })
  res.json({ bins })
})

// GET /api/bins/:id
export const getBin = asyncHandler(async (req, res) => {
  const bin = await Bin.findById(req.params.id)
  if (!bin) {
    res.status(404)
    throw new Error('Bin not found')
  }
  res.json({ bin })
})

// POST /api/bins  (admin)
export const createBin = asyncHandler(async (req, res) => {
  const { bin_id, address, zone, lat, lng, fill_level, status } = req.body
  const bin = await Bin.create({ bin_id, address, zone, lat, lng, fill_level, status })
  res.status(201).json({ bin })
})

// PUT /api/bins/:id  (admin)
export const updateBin = asyncHandler(async (req, res) => {
  const bin = await Bin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!bin) {
    res.status(404)
    throw new Error('Bin not found')
  }
  res.json({ bin })
})

// DELETE /api/bins/:id  (admin)
export const deleteBin = asyncHandler(async (req, res) => {
  const bin = await Bin.findByIdAndDelete(req.params.id)
  if (!bin) {
    res.status(404)
    throw new Error('Bin not found')
  }
  res.json({ message: 'Bin deleted' })
})

// PATCH /api/bins/:id/fill-level  (collector — updates after collection, or simulated sensor)
export const updateFillLevel = asyncHandler(async (req, res) => {
  const { fill_level } = req.body
  const bin = await Bin.findById(req.params.id)
  if (!bin) {
    res.status(404)
    throw new Error('Bin not found')
  }

  bin.fill_level = fill_level
  if (fill_level === 0) bin.lastCollected = new Date()
  await bin.save()

  if (fill_level >= 80) {
    await Alert.create({
      bin: bin._id,
      message: `${bin.address} is at ${fill_level}% capacity`,
      severity: fill_level >= 95 ? 'critical' : 'warning',
    })
  }

  res.json({ bin })
})
