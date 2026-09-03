import express from 'express';
import { sendContactMessage, getContactMessagesAdmin, markMessageRead } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.post('/send', sendContactMessage);
router.get('/admin', protect, authorize('admin', 'super_admin'), getContactMessagesAdmin);
router.put('/:id/read', protect, authorize('admin', 'super_admin'), markMessageRead);

export default router;
