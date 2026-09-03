import express from 'express';
import { applyMembership, getMyMembership, getAllMembers, updateMemberStatus } from '../controllers/memberController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.post('/apply', applyMembership);
router.get('/my-status', protect, getMyMembership);

// Admin routes
router.get('/', protect, authorize('admin', 'super_admin'), getAllMembers);
router.put('/:id/status', protect, authorize('admin', 'super_admin'), updateMemberStatus);

export default router;
