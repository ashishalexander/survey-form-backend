import express, { RequestHandler } from 'express';
import * as surveyController from '../controllers/surveyController';

const router = express.Router();

const submitSurveyHandler = surveyController.submitSurvey as RequestHandler;

router.post('/survey/submit', submitSurveyHandler);

export default router;