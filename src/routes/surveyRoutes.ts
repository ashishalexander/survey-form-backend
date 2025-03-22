import express, { RequestHandler } from 'express';
import * as surveyController from '../controllers/surveyController';

const router = express.Router();

const submitSurveyHandler = surveyController.submitSurvey as RequestHandler;
const getSurveysHandler = surveyController.getSurveys as RequestHandler;

router.post('/survey/submit', submitSurveyHandler);
router.get('/', getSurveysHandler);

export default router;