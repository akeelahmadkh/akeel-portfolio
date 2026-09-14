import { Schema, model } from 'mongoose';

export interface IProject {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: 'AI / ML' | 'Mobile' | 'Full Stack' | 'Backend' | 'Web' | 'Other';
  technologies: string[];
  thumbnail: string;
  screenshots: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  status: 'Completed' | 'In Progress' | 'Coming Soon';
  architecture?: string;
  challenges?: string;
  lessonsLearned?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: {
      type: String,
      enum: ['AI / ML', 'Mobile', 'Full Stack', 'Backend', 'Web', 'Other'],
      required: true,
    },
    technologies: [{ type: String, required: true }],
    thumbnail: { type: String, default: '' },
    screenshots: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Coming Soon'],
      default: 'Completed',
    },
    architecture: { type: String, default: '' },
    challenges: { type: String, default: '' },
    lessonsLearned: { type: String, default: '' },
  },
  { timestamps: true }
);

export const ProjectModel = model<IProject>('Project', ProjectSchema);
