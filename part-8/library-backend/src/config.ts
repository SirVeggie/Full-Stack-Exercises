import 'dotenv/config';

export const config = {
    mongoUrl: process.env.MONGODB_URI || '',
    jwtSecret: process.env.JWT_SECRET,
};