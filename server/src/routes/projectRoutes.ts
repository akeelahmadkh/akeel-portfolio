import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProjectModel, IProject } from '../models/Project';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Fallback seed projects in case database is empty or offline
export const INITIAL_PROJECTS: IProject[] = [
  {
    title: 'Nexa Bank',
    slug: 'nexa-bank',
    shortDescription: 'Full-stack digital banking application designed to simulate real-world banking workflows, including authentication, OTP verification, role-based functionality, backend communication, and a modern UI.',
    fullDescription: 'Nexa Bank is a full-stack digital banking application designed to simulate real-world banking workflows, including authentication, OTP verification, role-based functionality, backend communication, and a modern application interface.',
    category: 'Full Stack',
    technologies: ['React', 'React Native', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    ],
    githubUrl: 'https://github.com/akeel-dev/nexa-bank',
    liveUrl: 'https://nexa-bank-demo.vercel.app',
    featured: true,
    status: 'Completed',
    architecture: 'Microservices architecture with RESTful Express endpoints, MongoDB transactions for bank transfers, JWT auth, and OTP validation service layer.',
    challenges: 'Ensuring atomic financial transactions without race conditions while supporting real-time mobile push notifications.',
    lessonsLearned: 'Deepened mastery of security handshakes, multi-factor OTP validation, role-based access control (RBAC), and transactional database integrity.',
  },
  {
    title: 'VisionAI Mobile Suite',
    slug: 'vision-ai-mobile',
    shortDescription: 'React Native mobile application integrated with deep learning models for real-time computer vision and mobile object classification.',
    fullDescription: 'An AI-powered mobile application built using React Native and TensorFlow Lite / PyTorch backend APIs. Allows users to capture live video feeds and run edge ML models for real-time item detection and AI analysis.',
    category: 'AI / ML',
    technologies: ['React Native', 'Python', 'TensorFlow', 'PyTorch', 'Node.js', 'Expo', 'FastAPI'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    ],
    githubUrl: 'https://github.com/akeel-dev/vision-ai-mobile',
    liveUrl: '',
    featured: true,
    status: 'Completed',
    architecture: 'Client-side edge model inference optimized via TFLite with fallback to FastAPI REST server for intensive deep learning tasks.',
    challenges: 'Optimizing model latency and memory usage on mid-range Android & iOS smartphones.',
    lessonsLearned: 'Gained expertise in cross-platform mobile optimization, model quantization, and asynchronous frame sampling.',
  },
  {
    title: 'NeuralTrack Deep Learning Platform',
    slug: 'neural-track',
    shortDescription: 'Deep Learning pipeline for RNN & LSTM time-series forecasting and intelligent metric monitoring.',
    fullDescription: 'Custom Python & PyTorch backend pipeline utilizing Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM) models to analyze sequential sensor and market data.',
    category: 'AI / ML',
    technologies: ['Python', 'PyTorch', 'RNN', 'LSTM', 'NumPy', 'Pandas', 'Express.js', 'MongoDB'],
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    ],
    githubUrl: 'https://github.com/akeel-dev/neural-track',
    liveUrl: '',
    featured: true,
    status: 'In Progress',
    architecture: 'Flask/FastAPI microservice communicating over WebSocket and REST endpoints with an Express middleware layer.',
    challenges: 'Managing exploding gradient problems during multi-step LSTM training cycles.',
    lessonsLearned: 'Mastered sequence data preprocessing, temporal windowing, and gradient clipping techniques.',
  },
  {
    title: 'Smart API Gateway & Microservices',
    slug: 'smart-api-gateway',
    shortDescription: 'Scalable backend API gateway with JWT rate-limiting, MongoDB caching, and microservice route management.',
    fullDescription: 'A high-throughput API gateway built in Node.js and TypeScript. Features adaptive rate-limiting, JWT authentication middleware, and automated error logging.',
    category: 'Backend',
    technologies: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Redis', 'Docker'],
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    ],
    githubUrl: 'https://github.com/akeel-dev/smart-api-gateway',
    liveUrl: '',
    featured: false,
    status: 'Completed',
    architecture: 'Event-driven backend service architecture using Express routing, Token Bucket rate-limiting algorithm, and MongoDB persistence.',
    challenges: 'Preventing bottlenecking during high burst traffic scenarios.',
    lessonsLearned: 'Hands-on experience in backend scaling, load distribution, and memory caching strategies.',
  },
];

// GET /api/projects
router.get('/', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbProjects = await ProjectModel.find().sort({ createdAt: -1 });
      if (dbProjects && dbProjects.length > 0) {
        return res.json(dbProjects);
      }
    }
    return res.json(INITIAL_PROJECTS);
  } catch (error) {
    return res.json(INITIAL_PROJECTS);
  }
});

// GET /api/projects/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await ProjectModel.findOne({ slug });
      if (project) return res.json(project);
    }
    const found = INITIAL_PROJECTS.find((p) => p.slug === slug);
    if (found) return res.json(found);
    return res.status(404).json({ error: 'Project not found' });
  } catch (error) {
    const found = INITIAL_PROJECTS.find((p) => p.slug === slug);
    if (found) return res.json(found);
    return res.status(404).json({ error: 'Project not found' });
  }
});

// POST /api/projects (Protected Admin Route)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const newProject = new ProjectModel(req.body);
    await newProject.save();
    return res.status(201).json(newProject);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to create project' });
  }
});

// PUT /api/projects/:id (Protected Admin Route)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const updated = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to update project' });
  }
});

// DELETE /api/projects/:id (Protected Admin Route)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await ProjectModel.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to delete project' });
  }
});

export default router;
