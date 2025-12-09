import orderModel from '../models/order.model.js';
import eventModel from '../models/event.model.js';

const createOrder = async (req, res, next) => {
    try {
        const { eventId, quantity } = req.body;
        const userId = req.user.id;

        if (!eventId || !quantity) {
            return res.status(400).json({ error: { message: 'Event ID and quantity are required' } });
        }

        if (quantity <= 0) {
            return res.status(400).json({ error: { message: 'Quantity must be greater than 0' } });
        }

        // Check capacity
        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: { message: 'Event not found' } });
        }

        if (event.tickets_sold + quantity > event.capacity) {
            return res.status(400).json({ error: { message: 'Sold Out: Not enough tickets available' } });
        }

        // Update tickets sold
        await eventModel.updateTicketsSold(eventId, quantity);

        // Create order
        const newOrder = await orderModel.create(userId, eventId, quantity);

        res.status(201).json({
            data: newOrder,
            message: 'Order created successfully',
        });
    } catch (error) {
        next(error);
    }
};

const listMyOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await orderModel.findByUserId(userId);

        res.status(200).json({
            data: orders,
            message: 'Orders retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createOrder,
    listMyOrders,
};
