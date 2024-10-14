import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DateTimeEntity } from './base/dateTimeEntity';
import { Theater } from './theater.entity';

@Entity('tickets')
export class Ticket extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  ticketname: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  gift: boolean;

  @ManyToOne((type) => Theater, (theater) => theater.tickets)
  theater: Theater;
}