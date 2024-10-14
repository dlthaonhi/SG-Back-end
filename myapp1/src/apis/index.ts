import express, { Express, Request, Response } from "express";
import ticketRouters from "./ticket/router.ticket";
import CityRouters from './city/router.city';
import TheaterRouters from './theater/theater.router';
import TicketRouter from './ticket/router.ticket';



import {Router} from 'express';

const router = express.Router();
// router.use("/ticket", ticketRouters);


router.use("/city", CityRouters)

export default router;