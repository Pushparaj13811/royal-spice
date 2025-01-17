import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import routes
import userRoutes from './routes/user.routes.js';

// Import error handling middleware
import { errorHandler } from './middlewares/error.middleware.js';

const app = express(); 

// Global Middlewares
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)

app.use(
    express.json({
        limit: '30kb'
    })
)

app.use(
    express.urlencoded({
        extended: true,
        limit: '30kb'
    })
)

app.use(express.static("public"));

app.use(cookieParser());

// Health check endpoint
app.get('/health', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy'
    });
});

// Routes
app.use('/api/v1/users', userRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Cannot find ${req.originalUrl} on this server`
    });
});

// Error handling middleware
app.use(errorHandler);

export default app;