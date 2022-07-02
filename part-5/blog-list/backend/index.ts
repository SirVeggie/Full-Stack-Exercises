import http from 'http';
import { app } from './app';
import { PORT } from './utils/config';
import { logInfo } from './utils/logger';

const server = http.createServer(app);

server.listen(PORT, () => {
    logInfo(`Server running on port ${PORT}`);
});