import express, { Express, NextFunction, Request, Response } from "express";

class MiddlewareTicket {
    async checkTicket (req:Request, res: Response, next: NextFunction) {
        try {
            let ticket: any = req.query.ticket;
            let arr_ticket: string[] =  ["VIP", "Stand", "Seat"];

            if (arr_ticket.includes(ticket)) {
                console.log(ticket);
                res.status(200).json({
                    success: true,
                    message: "Welcome",
                    ticket: ticket
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "Not found valid ticket"
                }); 
            }
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: error.message
            });
            
        }
    }
}

export default new MiddlewareTicket();
