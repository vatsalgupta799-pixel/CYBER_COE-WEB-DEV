import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    const decoded = jwt.verify(token, secret);
    return decoded; // { id, username, role, ... }
  } catch (error) {
    return null;
  }
}

export async function checkRole(allowedRoles) {
  const user = await getUserFromToken();
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
