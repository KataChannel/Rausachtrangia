import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     DeleteDateColumn,
   } from 'typeorm';
   @Entity('role', {orderBy: { CreateAt: 'DESC' } })
   export class RoleEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    Title: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    users: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    permission: string;
    Type: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Status: number;
    @CreateDateColumn()
    CreateAt: Date;
    @UpdateDateColumn()
    UpdateAt: Date;
    @DeleteDateColumn()
    DeleteAt: Date;
    @Column({ nullable: true })
    idCreate: string;
   }