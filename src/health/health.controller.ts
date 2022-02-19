import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {DiskHealthIndicator, HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator} from '@nestjs/terminus';
import {BaseController} from 'src/base/base.controller';
import {RedisHealthIndicator} from '@liaoliaots/nestjs-redis/health'; // note the import path
import {InjectRedis} from '@liaoliaots/nestjs-redis';
import {Redis} from 'ioredis';

@ApiTags('system')
@Controller('health')
export class HealthController extends BaseController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
        private mem: MemoryHealthIndicator,
        private dsk: DiskHealthIndicator,
        private redis: RedisHealthIndicator,
        @InjectRedis() private readonly defaultRedisClient: Redis,
        // private http: HttpHealthIndicator,
    ) {
        super();
    }

    @Get()
    @HealthCheck()
    @ApiOperation({summary: 'Health Check'})
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.mem.checkHeap('heap', 256 * 1024 * 1024),
            () => this.dsk.checkStorage('disk', {thresholdPercent: 0.8, path: '/'}),
            () => this.redis.checkHealth('default-redis-client', { client: this.defaultRedisClient }),
        ]);
    }
}
