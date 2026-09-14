import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db';
import projectRoutes, { INITIAL_PROJECTS } from './routes/projectRoutes';
import skillRoutes, { INITIAL_SKILLS } from './routes/skillRoutes';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import { UserModel } from './models/User';
import { ProjectModel } from './models/Project';
import { SkillModel } from './models/Skill';

dotenv.config();

const app = express();
let PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Async background DB seeding (non-blocking)
connectDB().then(async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'akeelahmadkh@gmail.com').trim().toLowerCase();
    const adminPass = (process.env.ADMIN_PASSWORD || 'akeel7887').trim();

    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPass, salt);
      await UserModel.create({
        email: adminEmail,
        passwordHash,
        role: 'admin',
      });
      console.log(`[MongoDB Seed] Admin user initialized: ${adminEmail}`);
    }

    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      await ProjectModel.insertMany(INITIAL_PROJECTS);
      console.log(`[MongoDB Seed] Inserted ${INITIAL_PROJECTS.length} flagship projects.`);
    }

    const skillCount = await SkillModel.countDocuments();
    if (skillCount === 0) {
      await SkillModel.insertMany(INITIAL_SKILLS);
      console.log(`[MongoDB Seed] Inserted ${INITIAL_SKILLS.length} initial skills.`);
    }
  } catch (err) {
    // Non-blocking fallback notification
  }
}).catch(() => {});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    developer: 'Akeel — AI + Mobile Developer',
    database: 'MongoDB Atlas',
  });
});

const startServer = (portToUse: number) => {
  const server = app.listen(portToUse, () => {
    console.log(`[Express Backend] Server running on http://localhost:${portToUse}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Express Backend] Port ${portToUse} is in use, trying fallback port ${portToUse + 1}...`);
      startServer(portToUse + 1);
    } else {
      console.error('[Express Backend] Server error:', err);
    }
  });
};

startServer(PORT);
