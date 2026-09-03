import express from 'express';
import {
  getLeadership,
  createLeadershipMember,
  updateLeadershipMember,
  deleteLeadershipMember,
} from '../controllers/leadershipController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getLeadership);
router.post('/', protect, authorize('admin', 'super_admin'), createLeadershipMember);
router.put('/:id', protect, authorize('admin', 'super_admin'), updateLeadershipMember);
router.delete('/:id', protect, authorize('admin', 'super_admin'), deleteLeadershipMember);

export default router;
