import bcryptjs from 'bcryptjs';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

// Compare password with hash
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}
