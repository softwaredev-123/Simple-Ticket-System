import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', orderController.createOrder);
router.get('/my', orderController.listMyOrders);

export default router;
