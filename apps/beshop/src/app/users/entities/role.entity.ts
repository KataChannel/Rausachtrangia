import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { UsersEntity } from './user.entity';
@Entity('role', {orderBy: { CreateAt: 'DESC' } })
export class RoleEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  users: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  permission: string;
}
