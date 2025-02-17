import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     DeleteDateColumn,
   } from 'typeorm';
   @Entity('nhacungcap', {orderBy: { CreateAt: 'DESC' } })
   export class NhacungcapEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    idDonhang: string;
    @Column({collation: "utf8_general_ci"})
    Title: string;
    @Column({collation: "utf8_general_ci"})
    email: string;
    @Column({collation: "utf8_general_ci"})
    SDT: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Ghichu: string;
    @Column({ type: "text", collation: "utf8_general_ci",default:''})
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