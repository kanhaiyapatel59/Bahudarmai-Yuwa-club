import express from 'express';
import {
  recordDonation,
  getDonationStats,
  getAllDonationsAdmin,
  updateDonationStatus,
} from '../controllers/donationController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.post('/record', recordDonation);
router.get('/stats', getDonationStats);

// Admin routes
router.get('/admin', protect, authorize('admin', 'super_admin'), getAllDonationsAdmin);
router.put('/:id/status', protect, authorize('admin', 'super_admin'), updateDonationStatus);

export default router;
