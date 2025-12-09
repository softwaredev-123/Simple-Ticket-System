import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: { message: 'Email and password are required' } });
        }

        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: { message: 'Email already exists' } });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.create(email, passwordHash);

        res.status(201).json({
            data: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
            message: 'User registered successfully',
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: { message: 'Email and password are required' } });
        }

        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
            message: 'Login successful',
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
};
