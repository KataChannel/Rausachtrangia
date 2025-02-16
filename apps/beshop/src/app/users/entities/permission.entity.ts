import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('permission', {orderBy: { CreateAt: 'DESC' } })
export class PermissionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  roles: string;
}
