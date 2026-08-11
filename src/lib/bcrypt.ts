import bcrypt from 'bcryptjs';
import { SALTROUNDS } from '../utils/constants.js';

async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(Number.parseInt(SALTROUNDS || '10'));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

async function comparePassword(password: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

export { hashPassword, comparePassword };
