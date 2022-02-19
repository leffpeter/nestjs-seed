import {AutoMap} from "@automapper/classes";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";
import {BaseDto} from "src/base/dto/base.dto";

export class CreateUserDto extends BaseDto {
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    login: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsEmail()
    @AutoMap()
    email: string;

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
