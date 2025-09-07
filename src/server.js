// src/server.js
import dotenv from 'dotenv';
dotenv.config(); // MUST run before other imports that may read process.env

import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import routes from './routes/index.js';
import { connectDB } from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: '*' } });
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    console.log('Starting server — checking env vars...');
    console.log('MONGO_URI present?', !!process.env.MONGO_URI);
    await connectDB();
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server — full error:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

start();