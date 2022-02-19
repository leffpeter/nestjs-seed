import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserDto} from './dto/user.dto';
import {User} from './entities/user.entity';

@Injectable()
export class UsersProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        // Pass 👇 the Mapper to the parent AutomapperProfile class
        super(mapper);
    }
    
    // 👇 implement mapProfile()
    // mapProfile() will be called automatically by AutomapperProfile abstract class
    mapProfile() {
        return mapper => {
            mapper.createMap(User, UserDto);
            mapper.createMap(User, CreateUserDto);
            mapper.createMap(User, UpdateUserDto);
        }
    }
}
