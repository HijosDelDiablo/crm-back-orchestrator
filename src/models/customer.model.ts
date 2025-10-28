import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 20, default: 'prospecto' })
  estado: string;
}