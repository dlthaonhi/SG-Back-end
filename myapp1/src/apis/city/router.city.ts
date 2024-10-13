import express from 'express';
import CityController from './controller.city'

const routers = express.Router();

routers.get('/get',CityController.getAllCities)

export default routers;
