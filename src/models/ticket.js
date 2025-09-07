import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' },
  entryTime: { type: Date },
  exitTime: { type: Date },
  amount: { type: Number }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
