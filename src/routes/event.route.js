import { Router } from 'express';
import eventController from '../controllers/event.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Public route to list events
router.get('/', eventController.listEvents);

// Protected route to create event (Admin only)
// Note: authMiddleware checks for token, controller checks for role
router.post('/', authMiddleware, eventController.createEvent);

export default router;
