import {Module} from '@nestjs/common';
import {RedisService} from './redis.service';

@Module({
    // imports: [RedisService],
    providers: [RedisService],
    // exports: [RedisService]
})
export class RedisModule {// tiene sentido un módulo propio ???
}
