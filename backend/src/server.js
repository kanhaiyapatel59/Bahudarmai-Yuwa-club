import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { runSeedData } from './controllers/seedController.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import newsNoticeRoutes from './routes/newsNoticeRoutes.js';
import bloodDonorRoutes from './routes/bloodDonorRoutes.js';
import helpRequestRoutes from './routes/helpRequestRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import leadershipRoutes from './routes/leadershipRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import siteSettingsRoutes from './routes/siteSettingsRoutes.js';

dotenv.config();

const app = express();

// Trust proxy for Render / Cloud reverse proxies
app.set('trust proxy', true);

// Security & Utility Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiter with explicit Cloud Proxy validation disabled
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300,
  validate: { xForwardedForHeader: false },
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', limiter);

// Root route & Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Bahudarmai Yuwa Club (BYC) API Service Running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Cloud Seed Routes (Populate MongoDB Atlas)
app.get('/api/seed', runSeedData);
app.get('/api/v1/seed', runSeedData);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/members', memberRoutes);
app.use('/api/v1/volunteers', volunteerRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/news-notices', newsNoticeRoutes);
app.use('/api/v1/blood-donors', bloodDonorRoutes);
app.use('/api/v1/help-requests', helpRequestRoutes);
app.use('/api/v1/donations', donationRoutes);
app.use('/api/v1/leadership', leadershipRoutes);
app.use('/api/v1/achievements', achievementRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/site-settings', siteSettingsRoutes);

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect Database & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`BYC Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
});
