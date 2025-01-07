import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('email', {orderBy: { CreateAt: 'DESC' } })
export class ConfigEmailEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    // @Column({ collation: "utf8_general_ci" })
    // host: string;
    // @Column({ collation: "utf8_general_ci" })
    // port: string;
    // @Column({ default: 1 })
    // secure: number
    // @Column({ default: 1 })
    // authuser: number
    // @Column({ default: 1 })
    // securepass: number
    // @Column({ default: 0 })
    // Type: number;
    // @Column({ default: 0 })
    // Trangthai: number;
    // @Column({ default: true })
    // Status: boolean;
    // @Column({ collation: "utf8_general_ci" })
    // Ghichu: string;
    // @Column({ collation: "utf8_general_ci" })
    // idTao: string;
    // @CreateDateColumn()
    // Ngaytao: Date;
}