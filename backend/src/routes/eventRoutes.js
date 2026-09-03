import express from 'express';
import {
  getEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventParticipants,
} from '../controllers/eventController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:slug', getEventBySlug);
router.post('/register', registerForEvent);

// Admin / Event Manager routes
router.post('/', protect, authorize('admin', 'super_admin', 'event_manager'), createEvent);
router.put('/:id', protect, authorize('admin', 'super_admin', 'event_manager'), updateEvent);
router.delete('/:id', protect, authorize('admin', 'super_admin', 'event_manager'), deleteEvent);
router.get('/:eventId/participants', protect, authorize('admin', 'super_admin', 'event_manager'), getEventParticipants);

export default router;
