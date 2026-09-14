import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ContactModel, IContact } from '../models/Contact';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Memory store fallback if DB is establishing connection
let MEMORY_CONTACTS: IContact[] = [];

// POST /api/contact (Public contact submission)
router.post('/', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const contactData: IContact = { name, email, subject, message };

  try {
    if (mongoose.connection.readyState === 1) {
      const newContact = new ContactModel(contactData);
      await newContact.save();
      console.log(`[Contact Form] Saved to MongoDB Atlas: ${name} (${email}) - ${subject}`);
      return res.status(201).json({ message: 'Thank you! Your message has been sent successfully.' });
    }
    
    // Fallback memory log
    MEMORY_CONTACTS.unshift({ ...contactData, createdAt: new Date() });
    console.log(`[Contact Form] Received (Memory Log): ${name} (${email}) - ${subject}`);
    return res.status(201).json({ message: 'Thank you! Your message has been sent successfully.' });
  } catch (error) {
    MEMORY_CONTACTS.unshift({ ...contactData, createdAt: new Date() });
    return res.status(201).json({ message: 'Thank you! Your message has been submitted successfully.' });
  }
});

// GET /api/contact (Protected Admin Route - Fetch all messages)
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbMessages = await ContactModel.find().sort({ createdAt: -1 });
      if (dbMessages && dbMessages.length > 0) {
        return res.json(dbMessages);
      }
    }
    return res.json(MEMORY_CONTACTS);
  } catch (error) {
    return res.json(MEMORY_CONTACTS);
  }
});

// DELETE /api/contact/:id (Protected Admin Route - Delete message)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await ContactModel.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Message deleted successfully.' });
    }
    MEMORY_CONTACTS = MEMORY_CONTACTS.filter((m: any) => m._id !== req.params.id);
    return res.json({ message: 'Message deleted successfully.' });
  } catch (error: any) {
    return res.status(400).json({ error: 'Failed to delete message.' });
  }
});

export default router;
