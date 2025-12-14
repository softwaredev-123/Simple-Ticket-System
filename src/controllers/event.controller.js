import eventModel from '../models/event.model.js';

const createEvent = async (req, res, next) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: { message: 'Forbidden: Admins only' } });
        }

        const { title, dateTime, location, capacity } = req.body;

        // Basic validation
        if (!title || !dateTime || !location || !capacity) {
            return res.status(400).json({ error: { message: 'All fields are required' } });
        }

        if (capacity <= 0) {
            return res.status(400).json({ error: { message: 'Capacity must be greater than 0' } });
        }

        const newEvent = await eventModel.create({ title, dateTime, location, capacity });

        res.status(201).json({
            data: newEvent,
            message: 'Event created successfully',
        });
    } catch (error) {
        next(error);
    }
};

const listEvents = async (req, res, next) => {
    try {
        const events = await eventModel.findAll();
        res.status(200).json({
            data: events,
            message: 'Events retrieved successfully',
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createEvent,
    listEvents,
};
