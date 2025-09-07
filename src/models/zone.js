import mongoose from 'mongoose';

const zoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: Number, default: 0 },
  lot: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot' }
}, { timestamps: true });

export default mongoose.model('Zone', zoneSchema);
