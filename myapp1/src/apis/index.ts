import express, { Express, Request, Response } from "express";
import ticketRouters from "./ticket/router.ticket";
import AuthRouters from './auth/router.auth';
import TheaterRouters from './theater/theater.router';
import TicketRouter from './ticket/router.ticket';



import {Router} from 'express';

const router = express.Router();
// router.use("/ticket", ticketRouters);


router.use("/auth", AuthRouters)

export default router;