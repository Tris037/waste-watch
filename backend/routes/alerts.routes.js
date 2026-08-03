import express from 'express'
import { getAlerts, createAlert, resolveAlert } from '../controllers/alerts.controller.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.use(protect, authorize('admin', 'collector'))
router.get('/', getAlerts)
router.post('/', createAlert)
router.patch('/:id/resolve', resolveAlert)

export default router
