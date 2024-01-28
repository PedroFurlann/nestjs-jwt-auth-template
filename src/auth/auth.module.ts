import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EnvService } from '../env/env.service';
import { EnvModule } from '../env/env.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const jwtSecret = env.get('JWT_SECRET_KEY');
        const expiresIn = env.get('JWT_EXPIRES_IN');

        return {
          signOptions: { expiresIn },
          secret: jwtSecret,
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
