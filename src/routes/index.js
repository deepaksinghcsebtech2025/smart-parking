import express from 'express';
import * as authCtrl from '../controllers/authController.js';
import * as parkingCtrl from '../controllers/parkingController.js';
import * as reservationCtrl from '../controllers/reservationController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);

// Parking
router.get('/parking/availability', parkingCtrl.getAvailability);

// Reservations & flows (protected)
router.post('/reservations', auth, reservationCtrl.reserve);
router.post('/checkin', auth, reservationCtrl.checkin);
router.post('/checkout/:reservationId', auth, reservationCtrl.checkout);

export default router;