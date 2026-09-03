import express from 'express';
import {
  createHelpRequest,
  trackHelpRequest,
  getAllHelpRequestsAdmin,
  updateHelpRequestStatus,
} from '../controllers/helpRequestController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.post('/request', createHelpRequest);
router.get('/track/:ticketNo', trackHelpRequest);

// Admin / Volunteer Coordinator routes
router.get('/admin', protect, authorize('admin', 'super_admin', 'volunteer_coordinator'), getAllHelpRequestsAdmin);
router.put('/:id/status', protect, authorize('admin', 'super_admin', 'volunteer_coordinator'), updateHelpRequestStatus);

export default router;
