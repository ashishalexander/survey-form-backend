import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCodes } from '../config/HttpStatusCodes';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

declare global {
  namespace Express {
    interface Request {
      admin?: { email: string; role: string };
    }
  }
}

export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.admin_token;
    
    if (!token) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    
    if (decoded.role !== 'admin') {
      return res.status(HttpStatusCodes.FORBIDDEN).json({
        success: false,
        error: 'Admin access required'
      });
    }
    
    req.admin = decoded;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if ((error as Error).name === 'JsonWebTokenError' || (error as Error).name === 'TokenExpiredError') {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
    
    res.status(HttpStatusCodes.SERVER_ERROR).json({
      success: false,
      error: 'Server Error'
    });
  }
};