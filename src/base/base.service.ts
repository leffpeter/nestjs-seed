import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/types";
import {NotFoundException} from "@nestjs/common";
import {Repository} from "typeorm";
import {IDto} from "./dto/base.dto";
import {IEntity} from "./entities/base.entity";

export interface IService {};

export interface ICRUDService<E extends IEntity, D extends IDto, CD extends IDto, UD extends IDto> extends IService {
    create(dto: CD): Promise<D>;
    findAll(): Promise<D[]>;
    findOne(id: number): Promise<D>;
    update(id: number, dto: UD): Promise<D>;
    delete(id: number): Promise<void>;

    getEntityById(id: number): Promise<E>;
    getAll(): Promise<E[]>;
    //TODO define all base functions
};

export abstract class BaseService implements IService {};

export abstract class BaseCRUDService<E extends IEntity, D extends IDto, CD extends IDto, UD extends IDto> implements ICRUDService<E, D, CD, UD> {
    // repository: Repository<E>;
    @InjectMapper() mapper: Mapper;

    constructor(
        // @InjectRepository(E) private repository: Repository<E>,
        protected repository: Repository<E>
    ) {
        //TODO workarround ???
        // this.repository = repository;
    }
    abstract create(dto: CD): Promise<D>;
    abstract findAll(): Promise<D[]>
    abstract findOne(id: number): Promise<D>;
    abstract update(id: number, dto: UD): Promise<D>;
    abstract delete(id: number): Promise<void>;

    // abstract getEntityById(id: number): Promise<E>;
    getEntityById(id: number): Promise<E> {
        const user = this.repository.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    getAll(): Promise<E[]> {
        return this.repository.find();
    }
}
