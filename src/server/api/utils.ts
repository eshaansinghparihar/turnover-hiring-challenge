import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const saltRounds = 10; // Increase this for better security
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};