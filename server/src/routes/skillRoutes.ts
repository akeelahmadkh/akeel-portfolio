import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { SkillModel, ISkill } from '../models/Skill';
import { authMiddleware } from '../middleware/auth';

const router = Router();

export const INITIAL_SKILLS: ISkill[] = [
  { name: 'React Native', category: 'Mobile Development', level: 'Working With' },
  { name: 'Flutter', category: 'Mobile Development', level: 'Learning' },
  { name: 'Kotlin', category: 'Mobile Development', level: 'Exploring' },
  { name: 'Expo CLI', category: 'Mobile Development', level: 'Working With' },
  { name: 'Python', category: 'AI & Machine Learning', level: 'Working With' },
  { name: 'NumPy & Pandas', category: 'AI & Machine Learning', level: 'Working With' },
  { name: 'Machine Learning', category: 'AI & Machine Learning', level: 'Working With' },
  { name: 'Deep Learning', category: 'AI & Machine Learning', level: 'Learning' },
  { name: 'RNN & LSTM', category: 'AI & Machine Learning', level: 'Learning' },
  { name: 'PyTorch / TensorFlow', category: 'AI & Machine Learning', level: 'Learning' },
  { name: 'Node.js', category: 'Backend & APIs', level: 'Working With' },
  { name: 'Express.js', category: 'Backend & APIs', level: 'Working With' },
  { name: 'RESTful APIs', category: 'Backend & APIs', level: 'Working With' },
  { name: 'Firebase', category: 'Backend & APIs', level: 'Working With' },
  { name: 'JWT & Security', category: 'Backend & APIs', level: 'Working With' },
  { name: 'JavaScript (ES6+)', category: 'Programming Languages', level: 'Working With' },
  { name: 'TypeScript', category: 'Programming Languages', level: 'Working With' },
  { name: 'Java', category: 'Programming Languages', level: 'Learning' },
  { name: 'MongoDB & Mongoose', category: 'Databases & Tools', level: 'Working With' },
  { name: 'Git & GitHub', category: 'Databases & Tools', level: 'Working With' },
];

// GET /api/skills
router.get('/', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const skills = await SkillModel.find().sort({ category: 1, name: 1 });
      if (skills && skills.length > 0) return res.json(skills);
    }
    return res.json(INITIAL_SKILLS);
  } catch (error) {
    return res.json(INITIAL_SKILLS);
  }
});

// POST /api/skills (Protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const newSkill = new SkillModel(req.body);
    await newSkill.save();
    return res.status(201).json(newSkill);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to create skill' });
  }
});

// PUT /api/skills/:id (Protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const updated = await SkillModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to update skill' });
  }
});

// DELETE /api/skills/:id (Protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await SkillModel.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to delete skill' });
  }
});

export default router;
