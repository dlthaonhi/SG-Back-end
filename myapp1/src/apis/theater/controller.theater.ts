import { Request, Response } from 'express';
import { theaterRepository } from './theaterRepository'; // Import repository

class TheaterController {
  async getAllTheaters(req: Request, res: Response) {
    try {
      const theaters = await theaterRepository.findAllAsync(); // Gọi phương thức từ repository
       res.status(200).json(theaters);
    } catch (error) {
      console.error(error);
       res.status(500).json({
        success: false,
        message: 'Failed to retrieve theaters',
      });
    }
  }
}

export default new TheaterController();
