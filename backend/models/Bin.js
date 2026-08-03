import mongoose from 'mongoose'

const binSchema = new mongoose.Schema(
  {
    bin_id: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true, trim: true },
    zone: { type: String, required: true, trim: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    fill_level: { type: Number, default: 0, min: 0, max: 100 },
    status: { type: String, enum: ['active', 'maintenance', 'inactive'], default: 'active' },
    lastCollected: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('Bin', binSchema)
