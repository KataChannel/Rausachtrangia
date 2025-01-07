import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  @Entity('tonkho', {orderBy: { CreateAt: 'DESC' } })
  export class TonkhoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    idSP: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Soluong: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    GiaVon: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Tonggia: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
    Bienthe: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Noidung: string;
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