import { AppModule } from '../app.module';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from './auth.module';

describe('Generate Access token', () => {
  let authService: AuthService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get(AuthService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should be able to generate and verify jwt access token', async () => {
    const accessToken = await authService.generateAccessToken({
      sub: 'Test id',
    });

    expect(accessToken).toEqual(expect.any(String));
  });
});
