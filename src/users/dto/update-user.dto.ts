import {AutoMap} from '@automapper/classes';
import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {CreateUserDto} from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    surName: string;

    @ApiProperty()
    @IsOptional()
    @AutoMap()
    lastName: string;

    @ApiProperty()
    @AutoMap()
    isActive: boolean;
}
