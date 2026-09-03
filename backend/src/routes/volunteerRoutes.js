import express from 'express';
import { applyVolunteer, getAllVolunteers, updateVolunteerStatus } from '../controllers/volunteerController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.post('/apply', applyVolunteer);
router.get('/', protect, authorize('admin', 'super_admin', 'volunteer_coordinator'), getAllVolunteers);
router.put('/:id/status', protect, authorize('admin', 'super_admin', 'volunteer_coordinator'), updateVolunteerStatus);

export default router;
