import express from 'express';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger';

dotenv.config();

import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app = express();

// Swagger setup
setupSwagger(app);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;