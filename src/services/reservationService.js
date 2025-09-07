import { Reservation, Ticket, Payment, Slot } from '../models/index.js';
import { assignSlotAtomic, occupySlot, releaseSlot } from './parkingService.js';

const RATE_CARD = {
  BIKE: 20, // per hour
  CAR: 50,
  BUS: 100
};

export async function createReservation({ userId, vehicleId, lotId, slotType, startTime, endTime }) {
  const reservedSlot = await assignSlotAtomic({ lotId, slotType });

  const reservation = await Reservation.create({
    userId,
    vehicleId,
    slotId: reservedSlot.id,
    startTime: startTime || new Date(),
    endTime: endTime || null,
    status: 'ACTIVE'
  });

  return { reservation, slot: reservedSlot };
}

export async function checkin({ reservationId }) {
  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) throw new Error('Reservation not found');

  await occupySlot(reservation.slotId);

  const ticket = await Ticket.create({ reservationId: reservation.id, entryTime: new Date() });
  return { reservation, ticket };
}

export async function checkout(reservationId) {
  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) throw new Error('Reservation not found');

  const entry = reservation.startTime || new Date();
  const exit = new Date();
  const ms = exit - new Date(entry);
  const hours = Math.max(1, Math.ceil(ms / (1000 * 60 * 60)));

  const slot = await Slot.findByPk(reservation.slotId);
  const rate = RATE_CARD[slot.slotType] || RATE_CARD.CAR;
  const amount = hours * rate;

  const ticket = await Ticket.create({ reservationId: reservation.id, entryTime: entry, exitTime: exit, amount });
  const payment = await Payment.create({ ticketId: ticket.id, amount, method: 'CASH', status: 'PENDING' });

  await releaseSlot(reservation.slotId);

  reservation.status = 'COMPLETED';
  await reservation.save();

  return { ticket, payment };
}

export default { createReservation, checkin, checkout };