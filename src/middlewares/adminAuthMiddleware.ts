import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCodes } from '../config/HttpStatusCodes';

// JWT secret key (should match the one in controller)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Extend Request type to include admin property
declare global {
  namespace Express {
    interface Request {
      admin?: { email: string; role: string };
    }
  }
}

export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from cookies
    const token = req.cookies.admin_token;
    
    // Check if token exists
    if (!token) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return res.status(HttpStatusCodes.FORBIDDEN).json({
        success: false,
        error: 'Admin access required'
      });
    }
    
    // Add admin info to request object
    req.admin = decoded;
    
    // Continue to the next middleware/controller
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Handle token verification errors
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