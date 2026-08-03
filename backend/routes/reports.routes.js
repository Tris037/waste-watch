import express from 'express'
import {
  createReport,
  getReports,
  updateReport,
  markCollected,
} from '../controllers/reports.controller.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createReport) // public — anyone can report a full bin
router.get('/', protect, authorize('admin', 'collector'), getReports)
router.patch('/:id', protect, authorize('admin'), updateReport)
router.patch('/:id/collect', protect, authorize('collector', 'admin'), markCollected)

export default router
