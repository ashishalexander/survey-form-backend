import { Request, RequestHandler, Response } from 'express';
import Survey from '../models/Survey';
import { HttpStatusCodes } from '../config/HttpStatusCodes';


export const submitSurvey = async (req: Request, res: Response)  => {
  try {
    // Check for spam (honeypot field)
    if (req.body.botField) {
      // Silently reject bot submissions
      return res.status(200).json({ success: true, message: 'Form submitted successfully' });
    }
    
    // Create new survey entry
    const survey = await Survey.create(req.body);
    
    res.status(HttpStatusCodes.CREATED).json({
      success: true,
      data: survey
    });
  } catch (error: any) {
    console.error('Survey submission error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        success: false,
        error: messages
      });
    }
    
    res.status(HttpStatusCodes.SERVER_ERROR).json({
      success: false,
      error: 'Server Error'
    });
  }
};


export const getSurveys = async (_req: Request, res: Response) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      count: surveys.length,
      data: surveys
    });
  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(HttpStatusCodes.SERVER_ERROR).json({
      success: false,
      error: 'Server Error'
    });
  }
};