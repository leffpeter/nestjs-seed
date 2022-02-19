import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UsersProfile} from './users.profile';
import {AutomapperModule} from '@automapper/nestjs';
import {BaseModule} from 'src/base/base.module';
import {EventsModule} from 'src/events/events.module';
import {RedisService} from 'src/redis/redis.service';

@Module({
    imports: [
        BaseModule,
        TypeOrmModule.forFeature([User]),
        AutomapperModule,
        EventsModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersProfile,
        UsersService,
        RedisService,
    ],
    exports: [UsersService]
})
export class UsersModule {}
