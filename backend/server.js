import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

import authRoutes from './routes/auth.routes.js'
import binsRoutes from './routes/bins.routes.js'
import reportsRoutes from './routes/reports.routes.js'
import alertsRoutes from './routes/alerts.routes.js'
import usersRoutes from './routes/users.routes.js'

dotenv.config()
await connectDB()

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '5mb' })) // 5mb to allow base64 report photos
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/bins', binsRoutes)
app.use('/api/reports', reportsRoutes)
app.use('/api/alerts', alertsRoutes)
app.use('/api/users', usersRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Waste-Watch API running on port ${PORT}`))
