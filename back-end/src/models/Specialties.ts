import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctorspecialty } from './Doctorspecialty';

@Entity('specialties', { schema: 'group-gbc' })
export class Specialties {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('timestamp', { name: 'createdAt' })
  readonly createdAt: Date;

  @Column('timestamp', {
    name: 'updatedAt',
    default: () => new Date(Date.now()),
  })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => Doctorspecialty,
    doctorspecialty => doctorspecialty.specialty,
  )
  doctorspecialties: Doctorspecialty[];

  constructor() {
    if (!this.createdAt) {
      this.createdAt = new Date(Date.now());
    }
    this.updatedAt = new Date(Date.now());
  }
}
