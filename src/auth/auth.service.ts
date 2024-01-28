import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: Record<string, unknown>): Promise<string> {
    const accessToken = this.jwtService.signAsync(payload);

    return accessToken;
  }
}
