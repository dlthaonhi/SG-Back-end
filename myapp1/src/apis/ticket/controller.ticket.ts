import express, { Express, NextFunction, Request, Response } from "express";
import { ticketRepository } from "./ticketRepository";
import {detailRepository} from "./detailRepository"


class TicketController {
    async checkTicket(req: Request, res: Response) {
        try {

            console.log(req.query.ticket as string);
            
            res.status(200).json({
                success: true,
                data: req.query.ticket
            });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllTickets(req: Request, res: Response) {
        try {
          const tickets = await ticketRepository.findAllAsync(); // Gọi phương thức từ repository
           res.status(200).json(tickets);
        } catch (error) {
          console.error(error);
           res.status(500).json({
            success: false,
            message: 'Failed to retrieve tickets',
          });
        }
    } 

    async getDetailTickets (req: Request, res: Response){
        try {
            const details = await detailRepository.findAllAsync();
            res.status(200).json(details);
        } catch (error) {
            console.error(error);
           res.status(500).json({
            success: false,
            message: 'Failed to retrieve ticket details',
          });
        }
    }
}

export default new TicketController();