import { pool } from '../db/pool.js';

const findByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

const create = async (email, passwordHash, role = 'user') => {
    const result = await pool.query(
        'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
        [email, passwordHash, role]
    );
    return result.rows[0];
};

export default {
    findByEmail,
    create,
};
