import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { MONGODB_URI, PORT } from './utils/config';
import { logError, logInfo } from './utils/logger';
import { errorHandler, requestLogger, unknownEndpoint } from './utils/middleware';
import mongoose from 'mongoose';
import { blogRouter } from './controllers/blogRouter';

logInfo(`Connecting to ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI).then(() => {
    logInfo('Connected to MongoDB');
}).catch((err) => {
    logError(`Error connecting to MongoDB: ${err.message}`);
});

export const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.use('/api/blogs', blogRouter);

app.use(unknownEndpoint);
app.use(errorHandler);
