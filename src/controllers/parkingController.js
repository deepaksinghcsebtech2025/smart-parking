import { Slot, Zone } from '../models/index.js';

export async function getAvailability(req, res, next) {
  try {
    const lotId = req.query.lotId;
    const available = await Slot.count({
      include: [{ model: Zone, as: 'zone', where: { lotId } }],
      where: { status: 'AVAILABLE' }
    });
    res.json({ available });
  } catch (err) { next(err); }
}