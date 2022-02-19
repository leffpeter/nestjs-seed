import {AutoMap} from "@automapper/classes";
import {ApiExtraModels, ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";
import {BaseDto} from "src/base/dto/base.dto";

export class UserDto extends BaseDto {

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    id: number;

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

    @ApiProperty()
    @AutoMap()
    createdAt: Date;

    @ApiProperty()
    @AutoMap()
    updatedAt: Date;
}
