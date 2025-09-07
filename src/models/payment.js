import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  amount: { type: Number },
  method: { type: String },
  status: { type: String, enum: ['PENDING','SUCCESS','FAILED'], default: 'PENDING' }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
