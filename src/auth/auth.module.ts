import {Global, Module} from '@nestjs/common';
import {UsersModule} from 'src/users/users.module';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './auth.constants';
import {JwtStrategy} from './jwt.strategy';
import {WsStrategy} from './ws.strategy';
import {RedisModule} from 'src/redis/redis.module';
import {RedisService} from 'src/redis/redis.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '3600s'},
        }),
        RedisModule,
    ],
    providers: [
        AuthService,
        RedisService,
        LocalStrategy,
        JwtStrategy,
        WsStrategy,
    ],
    exports: [AuthService]
})
export class AuthModule {}
