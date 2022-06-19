import morgan from 'morgan';

export const requestLogger = morgan('tiny');

export function unknownEndpoint(req: any, res: any) {
    res.status(404).json({ error: 'unknown endpoint' });
}

export function errorHandler(error: any, req: any, res: any, next: any) {
    console.error('Error: ' + error);
    
    next(error);
}