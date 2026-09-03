import express from 'express';
import {
  getGalleryAlbums,
  getGalleryAlbumById,
  createGalleryAlbum,
  updateGalleryAlbum,
  deleteGalleryAlbum,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getGalleryAlbums);
router.get('/:id', getGalleryAlbumById);

router.post('/', protect, authorize('admin', 'super_admin', 'content_manager'), createGalleryAlbum);
router.put('/:id', protect, authorize('admin', 'super_admin', 'content_manager'), updateGalleryAlbum);
router.delete('/:id', protect, authorize('admin', 'super_admin', 'content_manager'), deleteGalleryAlbum);

export default router;
