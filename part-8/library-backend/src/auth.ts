import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from './config';
import { UserDB } from './db';
import { Token, User } from './types';

export async function newUser(username: string, password: string, favoriteGenre: string): Promise<Omit<User, 'id'>> {
    if (!username || !favoriteGenre || !password)
        throw new Error('Invalid or missing user details');
    return {
        username,
        favoriteGenre,
        passwordHash: await hashPassword(password)
    };
}

function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export async function login(username: string, password: string): Promise<Token> {
    const user = await UserDB.findOne({ username });
    if (user === null || !await bcrypt.compare(password, user.passwordHash))
        throw new Error('Invalid username or password');

    const tokenUser = {
        username: user.username,
        id: user.id
    };
    
    if (config.jwtSecret === undefined)
        throw new Error('JWT secret not defined');

    const token = jwt.sign(tokenUser, config.jwtSecret, { expiresIn: '24h' });
    return { value: token };
}

export async function verifyToken(token: string): Promise<User> {
    if (config.jwtSecret === undefined)
        throw new Error('JWT secret not defined');
    const tokenUser = jwt.verify(token, config.jwtSecret) as { username: string, id: string };
    const user = await UserDB.findById(tokenUser.id);
    if (user === null)
        throw new Error('Invalid token');
    return user;
}