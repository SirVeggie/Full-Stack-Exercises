import { v1 as uuid } from 'uuid';

export function getUUID() {
    return uuid();
}

export function isString(object: unknown): object is string {
    return typeof object === 'string';
}

export function isNumber(object: unknown): object is number {
    return typeof object === 'number';
}

export function getString(object: unknown): string {
    if (!isString(object))
        throw 'CastError';
    return object;
}

export function isError(object: unknown): object is { error: string; } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return isString((object as any)?.error);
}