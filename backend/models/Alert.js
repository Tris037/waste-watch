import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema(
  {
    bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', default: null },
    message: { type: String, required: true },
    severity: { type: String, enum: ['info', 'warning', 'critical'], default: 'warning' },
    status: { type: String, enum: ['active', 'resolved'], default: 'active' },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('Alert', alertSchema)
