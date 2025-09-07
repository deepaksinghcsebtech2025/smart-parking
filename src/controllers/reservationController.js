import reservationService from '../services/reservationService.js';

export async function reserve(req, res, next) {
  try {
    const userId = req.user.id;
    const { vehicleId, lotId, slotType, startTime, endTime } = req.body;
    const result = await reservationService.createReservation({ userId, vehicleId, lotId, slotType, startTime, endTime });

    const io = req.app.get('io');
    if (io && result.slot) io.emit('slotUpdate', { slotId: result.slot.id, status: 'RESERVED' });

    res.status(201).json(result);
  } catch (err) { next(err); }
}

export async function checkin(req, res, next) {
  try {
    const { reservationId } = req.body;
    const result = await reservationService.checkin({ reservationId });
    const io = req.app.get('io');
    if (io) io.emit('slotUpdate', { slotId: result.reservation.slotId, status: 'OCCUPIED' });
    res.json(result);
  } catch (err) { next(err); }
}

export async function checkout(req, res, next) {
  try {
    const { reservationId } = req.params;
    const result = await reservationService.checkout(reservationId);
    const io = req.app.get('io');
    if (io) io.emit('slotUpdate', { slotId: result.ticket.reservationId, status: 'AVAILABLE' });
    res.json(result);
  } catch (err) { next(err); }
}