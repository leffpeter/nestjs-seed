import {Injectable, Logger} from '@nestjs/common';
import {InjectRedis} from '@liaoliaots/nestjs-redis';
import {Redis} from 'ioredis';

@Injectable()
export class RedisService<T> {
    private readonly logger = new Logger(RedisService.name);

    constructor(
        @InjectRedis() private readonly client: Redis
    ) {
    }

    async find(key: string): Promise<T> {
        this.logger.debug(`find: ${key}...`)
        const data = await this.client.get(key);
        this.logger.debug(`data: ${data}`)
        return data ? JSON.parse(data) as T : null;
    }

    async save(key: string, value: T): Promise<T> {
        await this.client.del(key);
        this.client.set(key, JSON.stringify(value));
        return this.find(key);
    }
}
