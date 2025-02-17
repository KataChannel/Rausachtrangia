 import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   DeleteDateColumn,
   JoinTable,
   ManyToMany,
 } from 'typeorm';
 export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user',
  Dev = 'dev',
  Iso = 'iso',
  Customer = 'customer',
  Nhanvienkho = 'nhanvienkho',
  Nhanvienbanhang = 'nhanvienbanhang',
  Nhanvienketoan = 'nhanvienketoan'
}
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
 @Entity('users', {orderBy: { CreateAt: 'DESC' } })
 export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({collation: "utf8_general_ci"})
  gid: string;
  @Column({ nullable: true,default:'0'})
  ref_id: string;
  @Column()
  SDT: string;
  @Column({collation: "utf8_general_ci"})
  idGroup: string;
  @Column({collation: "utf8_general_ci"})
  Code: string;
  @Column({collation: "utf8_general_ci"})
  Hoten: string;
  @Column({collation: "utf8_general_ci"})
  email: string;
  @Column({ type: "text", collation: "utf8_general_ci" })
  Gioitinh: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  EditChinhanhs: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Diachi: string;
  @Column()
  password: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Profile: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  roles: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Phanquyen: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Menu: string;
  @Column({collation: "utf8_general_ci",type:"simple-array"})
  fcmToken: string[];
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