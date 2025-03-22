import express, { RequestHandler } from 'express';
import * as adminAuthController from '../controllers/adminController';
import { requireAdminAuth } from '../middlewares/adminAuthMiddleware';

const router = express.Router();

router.post('/login', adminAuthController.login as RequestHandler);
router.post('/logout', adminAuthController.logout as RequestHandler);

router.get('/check-auth', requireAdminAuth as RequestHandler, adminAuthController.checkAuth );

router.get('/surveys', requireAdminAuth as RequestHandler, adminAuthController.getSurveys as RequestHandler);
router.get('/surveys/:id', requireAdminAuth as RequestHandler, adminAuthController.getSurveyById as RequestHandler);

export default router;