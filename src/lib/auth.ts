import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your_jwt_secret_here';

export interface AdminPayload {
  isAdmin: boolean;
  loginTime: number;
  iat?: number;
  exp?: number;
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function getAdminFromRequest(request: NextRequest): AdminPayload | null {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return null;
    }

    return verifyAdminToken(token);
  } catch (error) {
    console.error('Error getting admin from request:', error);
    return null;
  }
}

export function isAuthenticated(request: NextRequest): boolean {
  const admin = getAdminFromRequest(request);
  return admin !== null && admin.isAdmin === true;
}
