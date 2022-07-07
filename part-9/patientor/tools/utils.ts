import { v1 as uuid } from 'uuid';

export function getUUID() {
    return uuid();
}

export function isString(object: unknown): object is string {
    return typeof object === 'string';
}

export function getString(object: unknown): string {
    if (!isString(object))
        throw 'CastError';
    return object;
}