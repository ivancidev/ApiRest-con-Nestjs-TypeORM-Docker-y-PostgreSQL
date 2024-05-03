import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Student } from 'src/user/entities/user.entity';
@Entity()
export class AccessLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.accessLog)
  user: string;

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

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}

