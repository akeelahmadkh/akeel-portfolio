import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  passwordHash: string;
  role: 'admin';
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

export const UserModel = model<IUser>('User', UserSchema);
