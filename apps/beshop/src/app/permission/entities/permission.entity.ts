import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     DeleteDateColumn,
   } from 'typeorm';
   @Entity('permission', {orderBy: { CreateAt: 'DESC' } })
   export class PermissionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({unique:true})
    Title: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    roles: string;
    @Column({ default: '' })
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