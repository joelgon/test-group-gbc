import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctors } from './Doctors';
import { Specialties } from './Specialties';

@Index('fk_Doctors', ['doctorId'], {})
@Index('fk_Specialties', ['specialtyId'], {})
@Entity('doctorspecialty', { schema: 'group-gbc' })
export class Doctorspecialty {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id: number;

  @Column('int', { name: 'doctorId' })
  doctorId: number;

  @Column('int', { name: 'specialtyId' })
  specialtyId: number;

  @Column('timestamp', { name: 'createdAt' })
  readonly createdAt: Date;

  @Column('timestamp', { name: 'updatedAt' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Doctors, doctors => doctors.doctorspecialties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'doctorId', referencedColumnName: 'id' }])
  doctor: Doctors;

  @ManyToOne(() => Specialties, specialties => specialties.doctorspecialties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'specialtyId', referencedColumnName: 'id' }])
  specialty: Specialties;

  constructor() {
    if (!this.createdAt) {
      this.createdAt = new Date(Date.now());
    }
    this.updatedAt = new Date(Date.now());
  }
}
