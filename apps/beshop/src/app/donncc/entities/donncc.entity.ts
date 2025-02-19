import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     DeleteDateColumn,
   } from 'typeorm';
   @Entity('donncc', {orderBy: { CreateAt: 'DESC' } })
   export class DonnccEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({unique:true,collation: "utf8_general_ci"})
    MaDH: string;
    @Column({collation: "utf8_general_ci"})
    idNCC: string;
    @Column({collation: "utf8_general_ci",type: 'simple-json',default: () => "('[]')"})
    Sanpham: string;
    @Column({collation: "utf8_general_ci"})
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