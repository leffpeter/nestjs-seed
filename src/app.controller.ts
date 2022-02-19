import {Controller, Get, Post, Req, UseInterceptors, CacheInterceptor, UseGuards, Body} from '@nestjs/common';
import {ApiBasicAuth, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {AppService} from './app.service';
import {AuthService} from './auth/auth.service';
import {LoginDto} from './auth/dto/login.dto';
import {JwtAuthGuard} from './auth/jwt-auth.guard';
import {LocalAuthGuard} from './auth/local-auth.guard';
import {BaseController} from './base/base.controller';

@Controller()
@UseInterceptors(CacheInterceptor)
@ApiTags('auth')
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@ApiNotFoundResponse({description: 'Resource not found'})
export class AppController extends BaseController {
    constructor(private readonly appService: AppService, private authService: AuthService) {
        super();
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @ApiBasicAuth()
    @ApiOperation({summary: 'Login: user your app credentials to login.'})
    @ApiOkResponse({
        description: 'Access token',
        // type: string,
        isArray: false,
    })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('auth/profile')
    @ApiOperation({summary: 'Profile: get user profile.'})
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'User profile (WIP)',
        // type: any,
        isArray: false,
    })
    getProfile(@Req() req) {
        //TODO implement
        return req.user;
    }
}
