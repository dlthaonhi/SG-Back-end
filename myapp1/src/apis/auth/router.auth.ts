import express from 'express';
import AuthController from './controller.auth'
import {Router} from 'express';
// console.log(Router)
const routers = express.Router();

routers.post('/login',AuthController.login);
routers.post('/register',AuthController.register);
routers.post('/forgot-password', AuthController.forgotPassword)
routers.post('/reset-password', AuthController.resetPassword);

export default routers;
