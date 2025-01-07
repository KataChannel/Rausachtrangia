import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  @Entity('lienhe', {orderBy: { CreateAt: 'DESC' } })
  export class LienheEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Hoten: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Email: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Diachi: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    SDT: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Noidung: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
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