import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('khachhang', {orderBy: { CreateAt: 'DESC' } })
export class KhachhangEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idBanggia: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  MaKH: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  TenKH: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Khachhang: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  GioNhanhang: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Hoten: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Diachi: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Quan: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  SDT: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  MST: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Ghichu: string;
  @Column({ default: '' })
  Email: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
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