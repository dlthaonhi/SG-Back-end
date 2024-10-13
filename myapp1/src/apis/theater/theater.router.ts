import express from 'express';
import TheaterController from './controller.theater';

const router = express.Router();

router.get('/get', TheaterController.getAllTheaters);

export default router;
