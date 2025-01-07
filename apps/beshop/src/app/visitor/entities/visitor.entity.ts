import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
@Entity('visitor', {orderBy: { CreateAt: 'DESC' } })
export class VisitorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({nullable: true, type: 'text', collation: 'utf8_general_ci' })
  country_code: string;
  @Column({ nullable: true,type: 'text', collation: 'utf8_general_ci' })
  country_name: string;
  @Column({ nullable: true,type: 'text', collation: 'utf8_general_ci' })
  city: string;
  @Column({ nullable: true })
  postal: string;
  @Column({ nullable: true })
  latitude: string;
  @Column({ nullable: true })
  longitude: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  IPv4: string;
  @Column({ nullable: true })
  state: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ default: '' })
  Slug: string;
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
