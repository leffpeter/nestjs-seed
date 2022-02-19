import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {UserDto} from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import * as _ from 'lodash';
import {BaseService} from 'src/base/base.service';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/types';

@Injectable()
// export class UsersService extends BaseCRUDService<User, UserDto, CreateUserDto, UpdateUserDto> {
export class UsersService extends BaseService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectMapper() private mapper: Mapper,
    ) {
        //TODO workarround inject generic repository in BaseService???
        // super(usersRepository);
        super();
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const salt = bcrypt.genSalt();
        const password = bcrypt.hash(userDto.password, await salt);
        this.logger.log(`password: ${password}, with salt: ${salt}`)
        let user = this.usersRepository.create(userDto);
        user.password = await password;
        user.salt = await salt;
        const saved = await this.usersRepository.save(user);
        return this.mapper.map(saved, UserDto, User);
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.usersRepository.find();
        return users.map(u => this.mapper.map(u, UserDto, User));
    }

    async findOne(id: number): Promise<UserDto> {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }
        return this.mapper.map(user, UserDto, User);
    }

    async findByLogin(login: string): Promise<User> {
        return this.usersRepository.findOne({login: login});
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
        const userDto = await this.findOne(id);
        const mergedUserDto = _.merge(userDto, updateUserDto);
        const user = this.mapper.map(mergedUserDto, UserDto, User);
        this.usersRepository.update(id, user);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.delete(user.id);
    }

}
