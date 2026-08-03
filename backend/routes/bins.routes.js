import express from 'express'
import {
  getBins,
  getBin,
  createBin,
  updateBin,
  deleteBin,
  updateFillLevel,
} from '../controllers/bins.controller.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)
router.get('/', authorize('admin', 'collector'), getBins)
router.get('/:id', authorize('admin', 'collector'), getBin)
router.post('/', authorize('admin'), createBin)
router.put('/:id', authorize('admin'), updateBin)
router.delete('/:id', authorize('admin'), deleteBin)
router.patch('/:id/fill-level', authorize('admin', 'collector'), updateFillLevel)

export default router
