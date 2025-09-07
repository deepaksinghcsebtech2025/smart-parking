import { sequelize } from '../config/db.js';
import { Slot } from '../models/index.js';

/**
 * Assign a single slot atomically using Postgres SKIP LOCKED.
 * - lotId: parking lot id
 * - slotType: the required slot type ("CAR","BIKE","BUS")
 * Returns: the reserved slot row or throws if none available
 */
export async function assignSlotAtomic({ lotId, slotType }) {
  const sql = `
    WITH candidate AS (
      SELECT s.id
      FROM slots s
      JOIN zones z ON s."zoneId" = z.id
      WHERE s.status = 'AVAILABLE' AND s."slotType" = :slotType AND z."lotId" = :lotId
      ORDER BY z.priority ASC, s.id ASC
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    )
    UPDATE slots SET status = 'RESERVED' WHERE id = (SELECT id FROM candidate) RETURNING *;
  `;

  const t = await sequelize.transaction();
  try {
    const [rows] = await sequelize.query(sql, {
      replacements: { slotType, lotId },
      transaction: t
    });

    if (!rows || rows.length === 0) {
      await t.rollback();
      throw new Error('No slot available');
    }

    await t.commit();
    return rows[0];
  } catch (err) {
    if (!t.finished) await t.rollback();
    throw err;
  }
}

export async function occupySlot(slotId) {
  const slot = await Slot.findByPk(slotId);
  if (!slot) throw new Error('Slot not found');
  slot.status = 'OCCUPIED';
  await slot.save();
  return slot;
}

export async function releaseSlot(slotId) {
  const slot = await Slot.findByPk(slotId);
  if (!slot) return null;
  slot.status = 'AVAILABLE';
  await slot.save();
  return slot;
}

export default { assignSlotAtomic, occupySlot, releaseSlot };