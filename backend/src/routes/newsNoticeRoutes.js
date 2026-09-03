import express from 'express';
import {
  getNewsNotices,
  getNewsNoticeBySlug,
  getAllNewsNoticesAdmin,
  createNewsNotice,
  updateNewsNotice,
  deleteNewsNotice,
} from '../controllers/newsNoticeController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getNewsNotices);
router.get('/admin', protect, authorize('admin', 'super_admin', 'content_manager'), getAllNewsNoticesAdmin);
router.get('/:slug', getNewsNoticeBySlug);

router.post('/', protect, authorize('admin', 'super_admin', 'content_manager'), createNewsNotice);
router.put('/:id', protect, authorize('admin', 'super_admin', 'content_manager'), updateNewsNotice);
router.delete('/:id', protect, authorize('admin', 'super_admin', 'content_manager'), deleteNewsNotice);

export default router;
