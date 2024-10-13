import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

class VerifyService {
  private JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET as string;
  }

  async login(user: { ID: number }): Promise<string> {
    return jwt.sign({ id: user.ID }, this.JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
  }

  async verify(token: string): Promise<string | JwtPayload> {
    return jwt.verify(token, this.JWT_SECRET);
  }
}

export default new VerifyService();
