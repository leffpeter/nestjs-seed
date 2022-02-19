import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {UsersService} from './users.service';
import {createMock} from '@golevelup/ts-jest';
import {Mapper} from '@automapper/types';
import {UserDto} from './dto/user.dto';

describe('UsersService', () => {
    let service: UsersService;
    const user = new User();
    user.id = 1;
    const userDto = new UserDto();
    userDto.id = user.id;
    const userRepositoryMock = createMock<Repository<User>>(
        {
            findOne: () => new Promise((resolve, reject) => {resolve(user)}),
        }
    );
    const mapperMock = createMock<Mapper>(
        // {
            // map(user, userDto, User, UserDto): () => userDto,
        // }
    );

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepositoryMock,
                },
                {
                    provide: "automapper:nestjs:default",
                    useValue: mapperMock,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        // expect(service.findOne(1).then(u => u)).toBe(userDto);
    });
});
