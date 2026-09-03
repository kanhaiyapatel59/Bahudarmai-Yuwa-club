import express from 'express';
import {
  searchBloodDonors,
  registerBloodDonor,
  requestDonorContact,
  getAllDonorsAdmin,
  updateDonorAvailability,
} from '../controllers/bloodDonorController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.get('/search', searchBloodDonors);
router.post('/register', registerBloodDonor);
router.post('/request-contact', requestDonorContact);

// Admin routes
router.get('/admin', protect, authorize('admin', 'super_admin', 'volunteer_coordinator'), getAllDonorsAdmin);
router.put('/:id/availability', protect, authorize('admin', 'super_admin', 'volunteer_coordinator'), updateDonorAvailability);

export default router;
