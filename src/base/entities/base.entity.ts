
import {AutoMap} from '@automapper/classes';
import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export interface IEntity {
    id: number;
};

@Entity()
export abstract class BaseEntity implements IEntity {
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    @Column({nullable: true})
    @AutoMap()
    createdAt: Date;

    @Column({nullable: true})
    @AutoMap()
    updatedAt: Date;

    @BeforeInsert()
    async created() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    async updated() {
        //FIXME esto no rulaaaa
        this.updatedAt = new Date();
    }
}
