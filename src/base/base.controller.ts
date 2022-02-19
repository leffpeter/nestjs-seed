import {Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {ICRUDService} from "./base.service";
import {IDto} from "./dto/base.dto";
import {IEntity} from "./entities/base.entity";

export interface IController {};

export interface ICRUDController<S extends ICRUDService<IEntity, IDto, IDto, IDto>, D extends IDto, C extends IDto, U extends IDto> {

    post(dto: C): Promise<D>;

    getAll(): Promise<D[]>;

    get(id: string): Promise<D>;

    patch(id: string, dto: U): Promise<D>;

    delete(id: string): Promise<void>;
};

// @UseInterceptors(CacheInterceptor)//TODO mirar de montarla en la base
export abstract class BaseController implements IController {};

export abstract class BaseCRUDController<S extends ICRUDService<IEntity, IDto, IDto, IDto>, D extends IDto, C extends IDto, U extends IDto> implements ICRUDController<S, D, C, U> {

    constructor(
        private readonly service: ICRUDService<IEntity, D, C, U>,
    ) {}

    @Post()
    @ApiOperation({summary: 'Create new item of this type'})
    post(@Body() dto: C): Promise<D> {
        return this.service.create(dto);
    }

    @Get()
    @ApiOperation({summary: 'Get all items'})
    getAll(): Promise<D[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get item by id'})
    get(@Param('id') id: string): Promise<D> {
        return this.service.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update item data'})
    patch(@Param('id') id: string, @Body() dto: U): Promise<D> {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete item'})
    delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(+id);
    }

}
