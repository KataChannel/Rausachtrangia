import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('baiviet', {orderBy: { CreateAt: 'DESC' } })
export class BaivietEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idDM: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Motangan: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Noidung: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Footer: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Lienhe: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Slug: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Danhmuc: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  MetaTags: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Tags: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Type: string;
  @Column({ default: 0 })
  Noibat: number;
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