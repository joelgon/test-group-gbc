import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctorspecialty } from './Doctorspecialty';

@Entity('doctors', { schema: 'group-gbc' })
export class Doctors {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id: number;

  @Column('varchar', { name: 'name', length: 120 })
  name: string;

  @Column('decimal', { name: 'crm', precision: 7, scale: 0 })
  crm: number;

  @Column('varchar', { name: 'telephone', length: 255 })
  telephone: string;

  @Column('varchar', { name: 'cellphone', length: 255 })
  cellphone: string;

  @Column('varchar', { name: 'cep', length: 9 })
  cep: string;

  @Column('timestamp', { name: 'createdAt' })
  readonly createdAt: Date;

  @Column('timestamp', { name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Doctorspecialty, doctorspecialty => doctorspecialty.doctor)
  doctorspecialties: Doctorspecialty[];

  constructor() {
    if (!this.createdAt) {
      this.createdAt = new Date(Date.now());
    }
    this.updatedAt = new Date(Date.now());
  }
}
