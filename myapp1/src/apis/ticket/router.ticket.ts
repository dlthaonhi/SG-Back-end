import express from 'express';
import middlewareTicket from '../../middlewares/ticket.middleware';
import TicketController from './controller.ticket'

const routers = express.Router();

routers.get('/check-ticket',middlewareTicket.checkTicket, TicketController.checkTicket);
routers.get('/get',TicketController.getAllTickets)
routers.get('get-details', TicketController.getDetailTickets)

export default routers;
