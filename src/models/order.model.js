import { pool } from '../db/pool.js';

const create = async (userId, eventId, quantity) => {
    const result = await pool.query(
        `INSERT INTO orders (user_id, event_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING *`,
        [userId, eventId, quantity]
    );
    return result.rows[0];
};

const findByUserId = async (userId) => {
    const result = await pool.query(
        `SELECT o.*, e.title as event_title, e.location as event_location, e.date_time as event_date
         FROM orders o
         JOIN events e ON o.event_id = e.id
         WHERE o.user_id = $1
         ORDER BY o.created_at DESC`,
        [userId]
    );

    // Map the result to match the structure expected by frontend (nested Event object)
    return result.rows.map(row => ({
        id: row.id,
        user_id: row.user_id,
        event_id: row.event_id,
        quantity: row.quantity,
        created_at: row.created_at,
        Event: {
            title: row.event_title,
            location: row.event_location,
            dateTime: row.event_date
        }
    }));
};

export default {
    create,
    findByUserId,
};
