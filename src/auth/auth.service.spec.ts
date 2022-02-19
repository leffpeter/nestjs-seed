import {createMock} from '@golevelup/ts-jest';
import {JwtService} from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {RedisService} from 'src/redis/redis.service';
import {UsersService} from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock = createMock<JwtService>();
  let usersServiceMock = createMock<UsersService>();
  let redisServiceMock = createMock<RedisService<string>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          AuthService,
          {
              provide: JwtService,
              useValue: jwtServiceMock,
          },
          {
              provide: UsersService,
              useValue: usersServiceMock,
          },
          {
              provide: RedisService,
              useValue: redisServiceMock,
          },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
