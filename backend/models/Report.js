import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', default: null },
    reporterPhone: { type: String, required: true, trim: true },
    reporterName: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    lat: { type: Number },
    lng: { type: Number },
    description: { type: String, trim: true },
    photo: { type: String, default: null }, // base64 data URL, optional
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'collected'], default: 'pending' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    collectedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('Report', reportSchema)
