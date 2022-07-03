import morgan from 'morgan';
import { logError } from '../utils/logger';
import jwt from 'jsonwebtoken';

export const requestLogger = morgan('tiny');

export function unknownEndpoint(req: any, res: any) {
    res.status(404).json({ error: 'unknown endpoint' });
}

export function errorHandler(error: any, req: any, res: any, next: any) {
    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' });
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' });
    }
    
    logError(error.message);
    next(error);
}

export function tokenExtractor(req: any, res: any, next: any) {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    }
    next();
}

export function userExtractor(req: any, res: any, next: any) {
    const token = req.token;
    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? '') as any;
        req.user = decodedToken.id;
    }
    next();
}