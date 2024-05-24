import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { UUID } from 'crypto';
import { Student } from 'src/user/entities/user.entity';
import { Location } from 'src/location/entities/location.entity';
@Entity()
export class AccessLog {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Student, (student) => student.accessLog)
  user: string;

  @ManyToOne(() => Location, (location) => location.accessLog)
  location: number;

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
}

