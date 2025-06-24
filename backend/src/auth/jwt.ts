import { sign, verify } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object, expiresIn: string | number = '1h'): string => {
    return sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string): object | null => {
    try {
        return verify(token, SECRET_KEY) as object;
    } catch (error) {
        return null;
    }
};