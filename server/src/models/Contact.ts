import { Schema, model } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ContactModel = model<IContact>('Contact', ContactSchema);
