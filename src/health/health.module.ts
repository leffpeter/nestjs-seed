import {RedisHealthModule} from '@liaoliaots/nestjs-redis/health';
import {Module} from '@nestjs/common';
import {TerminusModule} from '@nestjs/terminus';
import {BaseModule} from 'src/base/base.module';
import {HealthController} from './health.controller';

@Module({
    imports: [
        BaseModule, 
        TerminusModule,
        RedisHealthModule,
    ],
    controllers: [HealthController],
    providers: [],
    exports: []
})
export class HealthModule {}
