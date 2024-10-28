import { NextFunction, Request, Response } from "express";

const checkTicket = (req: Request, res: Response, next: NextFunction): void => {
    const ticket = req.query.ticket as string;

    if (ticket) {
        console.log('OK');    
    } else {
        res.status(404).json({ message : 'Invalid Ticket'});
        return;
    }

    next();
}

export default checkTicket;