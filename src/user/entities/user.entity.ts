import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AccessLog } from 'src/access-log/entities/access-log.entity';
import * as bcrypt from 'bcrypt'
@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(()=> AccessLog, (accessLog) => accessLog.user, { cascade: true })
  accessLog: AccessLog[]
  
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 30 })
  code: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 90 })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
