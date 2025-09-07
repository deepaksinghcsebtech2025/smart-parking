import mongoose from 'mongoose';

const parkingLotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String }
}, { timestamps: true });

export default mongoose.model('ParkingLot', parkingLotSchema);
