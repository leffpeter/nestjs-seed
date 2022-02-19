import {Controller, Get, Post, Body, Patch, Param, Delete, VERSION_NEUTRAL} from '@nestjs/common';
import {UsersService} from './users.service';
import {ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {SecuredController} from 'src/base/secured.controller';
import {UserDto} from './dto/user.dto';

@Controller({
    path: 'users',
    version: VERSION_NEUTRAL,
})
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
// @UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(MapInterceptor(UserDto, User))
// export class UsersController extends SecuredRestController<UsersService, UserDto, CreateUserDto, UpdateUserDto> {
@ApiTags('users')
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@ApiNotFoundResponse({description: 'Resource not found'})
export class UsersController extends SecuredController {
    constructor(
        private readonly usersService: UsersService,
    ) {
        // super(usersService);
        super();
    }

    @Post()
    @ApiOperation({summary: 'Create new user'})
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: UserDto,
    })
    create(@Body() userDto: CreateUserDto): Promise<UserDto> {
        return this.usersService.create(userDto);
    }

    @Get()
    @ApiOperation({summary: 'Get all users'})
    @ApiOkResponse({
        description: 'Records found',
        type: UserDto,
        isArray: true,
    })
    findAll(): Promise<UserDto[]> {
        // this.eventsGateway.notifyAll();// TODO remove
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by id'})
    @ApiOkResponse({
        description: 'Record found',
        type: UserDto,
    })
    findOne(@Param('id') id: string): Promise<UserDto> {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update user data'})
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: UserDto,
    })
    update(@Param('id') id: string, @Body() userDto: UpdateUserDto): Promise<UserDto> {
        return this.usersService.update(+id, userDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete user'})
    @ApiOkResponse({
        description: 'Record deleted',
    })
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.delete(+id);
    }
}
