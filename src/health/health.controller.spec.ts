import {createMock} from '@golevelup/ts-jest';
import {getRedisToken} from '@liaoliaots/nestjs-redis';
import {RedisHealthIndicator} from '@liaoliaots/nestjs-redis/health';
import {DiskHealthIndicator, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator} from '@nestjs/terminus';
import {Test, TestingModule} from '@nestjs/testing';
import {Redis} from 'ioredis';
import {HealthController} from './health.controller';

describe('HealthController', () => {
    let controller: HealthController;

    const healthCheckServiceMock = createMock<HealthCheckService>();
    const typeOrmHealthIndicatorMock = createMock<TypeOrmHealthIndicator>();
    const memoryHealthIndicatorMock = createMock<MemoryHealthIndicator>();
    const diskHealthIndicatorMock = createMock<DiskHealthIndicator>();
    const redisHealthIndicatorMock = createMock<RedisHealthIndicator>();
    const redisClientMock = createMock<Redis>();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthController],
            providers: [
                {
                    provide: HealthCheckService,
                    useValue: healthCheckServiceMock,
                },
                {
                    provide: TypeOrmHealthIndicator,
                    useValue: typeOrmHealthIndicatorMock,
                },
                {
                    provide: MemoryHealthIndicator,
                    useValue: memoryHealthIndicatorMock,
                },
                {
                    provide: DiskHealthIndicator,
                    useValue: diskHealthIndicatorMock,
                },
                {
                    provide: RedisHealthIndicator,
                    useValue: redisHealthIndicatorMock,
                },
                {
                    provide: getRedisToken(""),
                    useValue: redisClientMock,
                },
            ]
        }).compile();

        controller = module.get<HealthController>(HealthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
