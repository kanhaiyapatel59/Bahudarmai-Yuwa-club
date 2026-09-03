import express from 'express';
import { getSiteSettings, updateSiteSettings } from '../controllers/siteSettingsController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getSiteSettings);
router.get('/public', getSiteSettings);
router.put('/', protect, authorize('super_admin', 'admin'), updateSiteSettings);

export default router;
