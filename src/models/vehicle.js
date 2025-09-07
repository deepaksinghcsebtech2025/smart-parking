import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true },
  vehicleType: { type: String, enum: ['BIKE','CAR','BUS'], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
