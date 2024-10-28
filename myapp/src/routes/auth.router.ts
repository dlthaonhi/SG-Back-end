import express, {Router} from 'express';
import authController from '../controllers/auth.controller';
import authenticateToken from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticateToken, authController.getMe);

router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

export default router;