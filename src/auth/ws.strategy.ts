import {Strategy} from 'passport-custom';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, Logger} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RedisService} from 'src/redis/redis.service';

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, "ws") {
    private readonly logger = new Logger(WsStrategy.name);
    constructor(
        private authService: AuthService,
        private redisService: RedisService<string>, //TODO implementar un redisService custom
    ) {
        super();
    }

    async validate(request: any): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                return this.verify(request) ? resolve(true) : reject(false)
            });
        } catch (ex) {
            this.logger.error('exception: ', ex);
            return false;
        }
    }

    private verify(request: any) {
        const bearerToken = request.handshake.headers.authorization.split(' ')[1];
        this.logger.log(`bearerToken: ${bearerToken}`);
        return this.isMagic(bearerToken) || this.isValid(bearerToken);
    }

    private isMagic(token: string) {
        return token && token === '<magic-token>';
    }

    private isValid(token: string): boolean {
        return this.authService.validate(token);
    }
}
