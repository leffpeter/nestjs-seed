import {AutoMap} from '@automapper/classes';
import {Exclude} from 'class-transformer';
import {BaseEntity} from 'src/base/entities/base.entity';
import {Column, Entity} from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @Column()
    @AutoMap()
    login: string;

    @Column()
    @Exclude()
    password: string;

    @Column({nullable: true})
    @Exclude()
    salt: string;

    @Column({nullable: false})
    @AutoMap()
    email: string;

    @Column()
    @AutoMap()
    name: string;

    @Column()
    @AutoMap()
    surName: string;

    @Column({nullable: true})
    @AutoMap()
    lastName: string;

    @Column({default: true})
    @AutoMap()
    isActive: boolean;

}
