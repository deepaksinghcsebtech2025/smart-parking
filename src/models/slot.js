import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  slotNumber: { type: String, required: true },
  slotType: { type: String, enum: ['BIKE','CAR','BUS'], required: true },
  status: { type: String, enum: ['AVAILABLE','RESERVED','OCCUPIED','OUT_OF_SERVICE'], default: 'AVAILABLE' },
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' }
}, { timestamps: true });

export default mongoose.model('Slot', slotSchema);
