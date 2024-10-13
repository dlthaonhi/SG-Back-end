import express, { Express, NextFunction, Request, Response } from "express";
import { cityRepository } from "./cityRepository";


class CityController {

    async getAllCities(req: Request, res: Response) {
        try {
          const cities = await cityRepository.findAllAsync(); 
           res.status(200).json(cities);
        } catch (error) {
          console.error(error);
           res.status(500).json({
            success: false,
            message: 'Failed to retrieve cities',
          });
        }
      } 
}

export default new CityController();