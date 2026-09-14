import { Schema, model } from 'mongoose';

export interface ISkill {
  name: string;
  category: string;
  level: 'Working With' | 'Learning' | 'Exploring';
  createdAt?: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ['Working With', 'Learning', 'Exploring'],
      default: 'Working With',
    },
  },
  { timestamps: true }
);

export const SkillModel = model<ISkill>('Skill', SkillSchema);
