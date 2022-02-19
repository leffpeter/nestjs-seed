import {Module, CacheModule, CacheInterceptor} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import configuration from './config/configuration';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {getConnectionOptions} from 'typeorm';
import {UsersModule} from './users/users.module';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {ScheduleModule} from '@nestjs/schedule';
import {AuthModule} from './auth/auth.module';
import {ThrottlerModule} from '@nestjs/throttler';
import {AutomapperModule} from '@automapper/nestjs';
import {classes} from '@automapper/classes';
import {BaseModule} from './base/base.module';
import {HealthModule} from './health/health.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {EventsModule} from './events/events.module';
import {RedisModule} from '@liaoliaots/nestjs-redis';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: ['.env.dev.local', '.env.dev'],
        }),
        //TODO TypeOrm migrations is using ormconfig.json. Move database props to dotenv
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                })
        }),
        CacheModule.register({
            ttl: 5, // seconds
            max: 10, // maximum number of items in cache
        }),
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        AutomapperModule.forRoot({
            options: [{name: 'classMapper', pluginInitializer: classes}],
            singular: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'web'),
        }),
        // RedisModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        //         await configService.get('redis');

        //         return {
        //             closeClient: true,
        //             config: {
        //                 host: '127.0.0.1',
        //                 port: 6380,
        //                 password: 'masterpassword1'
        //             }
        //         };
        //     }
        // }),
        RedisModule.forRoot({
            closeClient: true,
            config: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
                // password: process.env.password,
            }
        }),
        BaseModule,
        HealthModule,
        AuthModule,
        EventsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
        //TODO exclude auth/login for global guard ???
        // {
        //     provide: APP_GUARD,
        //     useClass: WsGuard,
        // }
    ],
})
export class AppModule {}
