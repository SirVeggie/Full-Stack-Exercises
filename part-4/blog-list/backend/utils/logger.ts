
export function logInfo(...params: any[]) {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
}

export function logError(...params: any[]) {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params);
    }
}