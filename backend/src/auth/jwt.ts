import { sign, verify } from 'jsonwebtoken';
import { Request } from 'express';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object, expiresIn: string | number = '1h'): string => {
    return sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string): object | null => {
    try {
        return verify(token, SECRET_KEY) as object;
    } catch {
        return null;
    }
};

export function getUserFromRequest(req: Request) {
    const auth = req.headers['authorization'];
    if (!auth) return null;
    const token = auth.replace('Bearer ', '');
    const user = verifyToken(token);
    if (!user || typeof user !== 'object' || !('id' in user)) return null;
    return user as { id: number; email: string };
}