import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     DeleteDateColumn,
   } from 'typeorm';
   @Entity('quanlykho', {orderBy: { CreateAt: 'DESC' } })
   export class QuanlykhoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({collation: "utf8_general_ci"})
    Title: string;
    @Column({collation: "utf8_general_ci"})
    MaKho: string;
    @Column({collation: "utf8_general_ci"})
    Diachi: string;
    // @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    // Diachi: string;
    @Column({collation: "utf8_general_ci"})
    Ghichu: string;
    @Column({ default: "utf8_general_ci" })
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