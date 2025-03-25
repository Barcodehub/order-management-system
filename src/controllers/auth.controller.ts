import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto, LoginUserDto } from '../dtos/auth.dto';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: RegisterUserDto = req.body;
      const authResponse = await AuthService.register(userData);
      res.status(201).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginData: LoginUserDto = req.body;
      const authResponse = await AuthService.login(loginData);
      res.json(authResponse);
    } catch (error) {
      next(error);
    }
  }
}