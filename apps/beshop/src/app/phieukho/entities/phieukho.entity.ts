import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     DeleteDateColumn,
   } from 'typeorm';
   @Entity('phieukho', {orderBy: { CreateAt: 'DESC' } })
   export class PhieukhoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({collation: "utf8_general_ci"})
    Title: string;
    @Column({collation: "utf8_general_ci"})
    MaPhieu: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    idSP: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Sanpham: string;
    @Column({collation: "utf8_general_ci"})
    idDonhang: string;
    @Column({collation: "utf8_general_ci"})
    idKho: string;
    @Column({ type: 'int' })
    Soluong: number;
    @Column()
    Ngaylapphieu: Date;
    @Column({collation: "utf8_general_ci"})
    Ghichu: string;
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