import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import User from './models/User.js'
import Bin from './models/Bin.js'

dotenv.config()
await connectDB()

async function seed() {
  await User.deleteMany({ email: { $in: ['admin@wastewatch.co.ke', 'collector@wastewatch.co.ke'] } })
  await Bin.deleteMany({})

  await User.create([
    { name: 'System Admin', email: 'admin@wastewatch.co.ke', password: 'admin1234', role: 'admin' },
    { name: 'John Collector', email: 'collector@wastewatch.co.ke', password: 'collector1234', role: 'collector' },
  ])

  await Bin.create([
    { bin_id: 'BIN-001', address: 'City Market Main Entrance', zone: 'CBD', lat: -1.2833, lng: 36.8167, fill_level: 45 },
    { bin_id: 'BIN-002', address: 'Bus Station Terminal A', zone: 'CBD', lat: -1.2864, lng: 36.8218, fill_level: 92 },
    { bin_id: 'BIN-003', address: 'Gikomba Market Section 1', zone: 'Eastlands', lat: -1.2833, lng: 36.8333, fill_level: 60 },
    { bin_id: 'BIN-004', address: 'Westlands Roundabout', zone: 'Westlands', lat: -1.2677, lng: 36.8121, fill_level: 20 },
  ])

  console.log('Seed complete.')
  console.log('Admin login: admin@wastewatch.co.ke / admin1234')
  console.log('Collector login: collector@wastewatch.co.ke / collector1234')
  process.exit(0)
}

seed()
