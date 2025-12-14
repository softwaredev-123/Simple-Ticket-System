import { pool } from '../db/pool.js';

const create = async ({ title, dateTime, location, capacity }) => {
    const result = await pool.query(
        `INSERT INTO events (title, date_time, location, capacity)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
        [title, dateTime, location, capacity]
    );
    return result.rows[0];
};

const findAll = async () => {
    const result = await pool.query(
        'SELECT * FROM events ORDER BY date_time ASC'
    );
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM events WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

const updateTicketsSold = async (id, quantity) => {
    const result = await pool.query(
        `UPDATE events
     SET tickets_sold = tickets_sold + $1
     WHERE id = $2
     RETURNING *`,
        [quantity, id]
    );
    return result.rows[0];
};

export default {
    create,
    findAll,
    findById,
    updateTicketsSold,
};
