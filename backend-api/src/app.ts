import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { apiRateLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import { apiRoutes } from './routes';

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration (Section 32)
const allowedOrigins = [
  'https://brandplus.com.br',
  'https://brand-plus-nine.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origem não permitida pelo CORS.'));
      }
    },
    credentials: true,
  })
);

// Body and Cookie Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate Limiter
app.use('/api/', apiRateLimiter);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'BRAND+ Official Backend API',
      timestamp: new Date().toISOString(),
    },
  });
});

// API v1 Routes
app.use('/api/v1', apiRoutes);

// Centralized Error Handler
app.use(errorHandler);

export default app;
