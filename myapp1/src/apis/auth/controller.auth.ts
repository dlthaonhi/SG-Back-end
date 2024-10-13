import express, { Express, Request, Response } from "express";
import AuthService from './service.auth';
// import UsersService from '../users/user.service';
export interface CustomRequest extends Request {
 token: string | null;
}
class AuthController {
  async login(req: Request, res: Response) {
    try {
      const {username, password } = req.body; 

      const token = await AuthService.login(username, password);
      if (!token) {
        res.status(500).json({
          success: false,
          message: "Failed to generate token", 
        });
      }
      

      (req as CustomRequest).token = token; 

      res.status(200).json({
        success: true,
        data: token,
      });
    } catch (error: any) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age,
      };

      if (!newUser.username || !newUser.email || !newUser.password) {
         res.status(400).json({
          success: false,
          message: "Error req: Missing fields",
        });
      }

      await AuthService.register(newUser);

       res.status(200).json({
        success: true,
        message: "Created User",
      });
    } catch (error: any) {
       res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async forgotPassword(req: Request, res: Response){
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);
       res.status(200).json({
        success: true,
        message: "Send successfully",
      });
    } catch (error: any) {
       res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, tokenReset, newPassword } = req.body;
      await AuthService.resetPassword({ email, tokenReset, newPassword });

       res.status(200).json({
        success: true,
        message: "Reset password successfully",
      });
    } catch (error: any) {
       res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AuthController();
