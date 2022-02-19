import {Injectable, Logger} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from 'src/users/users.service';
import {LoginDto} from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import {RedisService} from 'src/redis/redis.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private redisService: RedisService<string>, //TODO usar implementación propia de redisService o añadir funcionalidad redis a usersService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        this.logger.debug('validating: username = ' + username);
        const user = await this.usersService.findByLogin(username);
        if (user) {
            this.logger.log('user found;)');
            //TODO probar cuando se estén guardando usuarios vía api
            const isMatch = user.salt === null ? pass === user.password : await bcrypt.compare(pass, user.password);
            this.logger.log(`isMatch: ${isMatch}`);
            return isMatch ? user : null;
        }
        this.logger.warn(`user not found with login ${username}`);
        return null;
    }

    async login(login: LoginDto) {
        // const payload = {username: login.username, sub: login.userId};
        const payload = {username: login.username};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    validate(token: string): boolean {
        // this.logger.log(`token: ${token}`);
        return this.jwtService.verify(token) ? true : false;
    }
}
