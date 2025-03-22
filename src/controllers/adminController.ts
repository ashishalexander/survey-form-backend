import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCodes } from '../config/HttpStatusCodes';
import { COOKIE_OPTIONS } from '../config/CookieConfig';
import Survey from '../models/Survey';



const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('admin_token', token, COOKIE_OPTIONS);

    res.status(HttpStatusCodes.OK).json({
      success: true,
      message: 'Admin login successful'
    });
  } catch (error) {
    console.error('Admin login error:', error);
    next(error)
  }
};

export const logout = (_req: Request, res: Response) => {
  // Clear the admin_token cookie
  res.clearCookie('admin_token', {
    ...COOKIE_OPTIONS,
    maxAge: 0 // Expire immediately
  });
  
  res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const checkAuth = (_req: Request, res: Response) => {
  res.status(HttpStatusCodes.OK).json({
    success: true,
    message: 'Admin is authenticated'
  });
};


export const getSurveys = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = req.query.search as string || '';
    
    const skip = (page - 1) * limit;
    
    // Create search query
    const searchQuery = searchTerm ? {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ]
    } : {};
    
    // Get surveys with pagination and search
    const surveys = await Survey.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Survey.countDocuments(searchQuery);
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      surveys,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching surveys:', error);
    next(error);
  }
};

export const getSurveyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const surveyId = req.params.id;
    
    const survey = await Survey.findById(surveyId);
    
    if (!survey) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        error: 'Survey not found'
      });
    }
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      survey
    });
  } catch (error) {
    console.error(`Error fetching survey ${req.params.id}:`, error);
    next(error);
  }
};