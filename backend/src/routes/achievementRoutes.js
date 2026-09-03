import express from 'express';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getAchievements);
router.post('/', protect, authorize('admin', 'super_admin', 'content_manager'), createAchievement);
router.put('/:id', protect, authorize('admin', 'super_admin', 'content_manager'), updateAchievement);
router.delete('/:id', protect, authorize('admin', 'super_admin', 'content_manager'), deleteAchievement);

export default router;
