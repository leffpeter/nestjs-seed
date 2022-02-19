import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BaseEntity} from './entities/base.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BaseEntity]),
    ],
})
export class BaseModule {}
