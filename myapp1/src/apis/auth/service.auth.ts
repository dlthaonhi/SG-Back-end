import usersModel from './../../models/users.model';
import verifyService from '../../services/auth.service';
import HashService from '../../services/hash.service';
import ForgotPassword from '../../services/forgotpass.service';
import mailService from '../../services/mail.service';
import express, { Express, Request, Response } from "express";

interface IUser {
  ID: number;
  username: string;
  password: string;
  gender: boolean;
  age: number;
  email: string;
  salt?: string;
  tokenReset?: string | null;
  passwordResetExpiration?: Date | null;
  passwordLastResetDate?: Date | null;
}
type IUserRegister = Omit<IUser, 'ID'>;


class AuthService {
  async login(username: string, password: string): Promise<string> {
    try {
      
      const user: IUser | null = await usersModel.getUserByUsername(username);
      if (!user) {
        throw new Error('Username: NOT FOUND');
      }
      
      
      const enteredPassword = await HashService.hashPassword(user.salt!, password);
      console.log("Pass in DB", user.password);
      console.log("Enter", enteredPassword);
      
      if (user.password !== enteredPassword) {
        throw new Error('Password: WRONG');
      }

      const token: string = await verifyService.login(user);
      return token;
    } catch (error) {
      throw error;
    }
  }

  async register(user: IUserRegister): Promise<void> {
    try {
      const salt = await HashService.generateSalt();
      const hashedPassword = await HashService.hashPassword(salt, user.password);
      user.salt = salt;
      user.password = hashedPassword;
      await usersModel.createUser(user);
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const user: IUser | null = await usersModel.getUserByEmail(email);
      if (!user) {
        throw new Error('Email: NOT FOUND');
      }

      const token = await ForgotPassword.generateToken();
      user.tokenReset = token;
      user.passwordResetExpiration = new Date(Date.now() + 10 * 60 * 1000);
      await usersModel.updateUser(user.ID, user);
      await mailService.sendEmail(email, 'Reset', token);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword({ email, tokenReset, newPassword }: { email: string; tokenReset: string; newPassword: string }): Promise<void> {
    try {
      const passwordResetExpiration: any = new Date(Date.now());
      const user: IUser | null = await usersModel.getUserResetPassword(email, tokenReset, passwordResetExpiration);

      if (!user) {
        throw new Error('Invalid token or token has expired');
      }

      const salt = await HashService.generateSalt();
      const hashedPassword = await HashService.hashPassword(salt, newPassword);
      user.salt = salt;
      console.log("Old pass:", user.password);
      
      user.password = hashedPassword;
      console.log("New pass:", user.password);
      user.tokenReset = null;
      user.passwordResetExpiration = null;
      user.passwordLastResetDate = new Date(Date.now());

      await usersModel.updateUser(user.ID, user);
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
